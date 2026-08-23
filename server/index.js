import cors from 'cors'
import express from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { promisify } from 'node:util'
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'

const app = express(), dataFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data.json'), scrypt = promisify(scryptCallback)
app.use(cors()); app.use(express.json())
async function readData() { return JSON.parse(await readFile(dataFile, 'utf8')) }
async function saveData(data) { await writeFile(dataFile, JSON.stringify(data, null, 2)) }
const validate = (body, fields) => fields.filter(field => !body[field] && body[field] !== 0)
async function hashPassword(password) { const salt = randomBytes(16).toString('hex'), hash = await scrypt(password, salt, 64); return `${salt}:${hash.toString('hex')}` }
async function passwordMatches(password, stored) { const [salt, saved] = stored.split(':'), hash = await scrypt(password, salt, 64); return timingSafeEqual(hash, Buffer.from(saved, 'hex')) }
const publicUser = user => ({ id: user.id, name: user.name, email: user.email })
async function requireAuth(req, res, next) { try { const token = req.headers.authorization?.replace('Bearer ', ''), data = await readData(), session = data.sessions?.find(item => item.token === token); if (!session) return res.status(401).json({ message: 'Please sign in to continue.' }); req.user = data.users.find(user => user.id === session.userId); next() } catch (error) { next(error) } }

app.post('/api/auth/register', async (req, res, next) => { try { const missing = validate(req.body, ['name', 'email', 'password']); if (missing.length) return res.status(400).json({ message: `Required: ${missing.join(', ')}` }); if (req.body.password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' }); const data = await readData(); if (data.users.some(user => user.email.toLowerCase() === req.body.email.toLowerCase())) return res.status(409).json({ message: 'An account with this email already exists.' }); const user = { id: Date.now(), name: req.body.name.trim(), email: req.body.email.trim().toLowerCase(), passwordHash: await hashPassword(req.body.password) }, token = randomBytes(32).toString('hex'); data.users.push(user); data.sessions.push({ token, userId: user.id }); await saveData(data); res.status(201).json({ token, user: publicUser(user) }) } catch (error) { next(error) } })
app.post('/api/auth/login', async (req, res, next) => { try { const data = await readData(), user = data.users.find(item => item.email === String(req.body.email || '').trim().toLowerCase()); if (!user || !(await passwordMatches(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Email or password is incorrect.' }); const token = randomBytes(32).toString('hex'); data.sessions.push({ token, userId: user.id }); await saveData(data); res.json({ token, user: publicUser(user) }) } catch (error) { next(error) } })
app.get('/api/auth/me', requireAuth, (req, res) => res.json(publicUser(req.user)))
app.post('/api/auth/logout', requireAuth, async (req, res, next) => { try { const data = await readData(); data.sessions = data.sessions.filter(item => item.token !== req.headers.authorization.replace('Bearer ', '')); await saveData(data); res.status(204).end() } catch (error) { next(error) } })

function collectionRoutes(resource, required) { app.get(`/api/${resource}`, requireAuth, async (_req, res, next) => { try { res.json((await readData())[resource]) } catch (error) { next(error) } }); app.post(`/api/${resource}`, requireAuth, async (req, res, next) => { try { const missing = validate(req.body, required); if (missing.length) return res.status(400).json({ message: `Required: ${missing.join(', ')}` }); const data = await readData(), item = { ...req.body, id: Date.now() }; data[resource].unshift(item); await saveData(data); res.status(201).json(item) } catch (error) { next(error) } }) }
collectionRoutes('vehicles', ['name', 'year', 'price', 'type', 'fuel']); collectionRoutes('customers', ['name', 'email', 'phone']); collectionRoutes('deals', ['customer', 'vehicle', 'amount', 'stage'])
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'An unexpected server error occurred.' }) })
app.listen(process.env.PORT || 4000, () => console.log('AUTOHUB API listening on port 4000'))
