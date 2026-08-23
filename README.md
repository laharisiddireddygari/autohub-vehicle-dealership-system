# AUTOHUB

AUTOHUB is a responsive dealership management platform for tracking inventory, customer relationships, sales opportunities, and after-sales service.

## Features

- Professional dashboard with KPIs, sales visualisation, recent activity, and inventory highlights
- Vehicle inventory search, filters-ready controls, detail views, and add-vehicle workflow
- Customer directory with search and add-customer workflow
- Sales pipeline, service centre, reporting, and settings views
- REST API with validation, error responses, and CRUD endpoints for vehicles, customers, and deals
- Responsive layouts for desktop, tablet, and mobile

## Technology

- React 19, React Router, Vite
- Express 5 and CORS
- Lucide icon set
- CSS design system with reusable components and responsive breakpoints
- JSON file persistence for local development (`server/data.json`)

## Run locally

1. Install dependencies: `npm install`
2. Start the web app and API together: `npm run dev`
3. Open `http://localhost:5173`

To create a production frontend bundle, run `npm run build`. To run the API independently, use `npm run dev:server`.

## API

`GET`, `POST`, `PUT`, and `DELETE` are available for `/api/vehicles`, `/api/customers`, and `/api/deals`. A health check is at `/api/health`.

## Structure

```
src/                 React pages, components, data, and styles
server/index.js      Express REST API
server/data.json     Local development data store
```
