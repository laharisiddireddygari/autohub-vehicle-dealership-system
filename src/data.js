export const vehicles = [
  { id: 1, name: 'Mahindra XUV700 AX7', year: 2025, price: 2799000, type: 'SUV', status: 'Available', mileage: '12 km', fuel: 'Petrol', color: 'Midnight Black', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'BMW M4 Competition', year: 2024, price: 15350000, type: 'Coupe', status: 'Reserved', mileage: '28 km', fuel: 'Petrol', color: 'Brooklyn Grey', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Porsche Taycan 4S', year: 2024, price: 18950000, type: 'Sedan', status: 'Available', mileage: '6,182 km', fuel: 'Electric', color: 'Ice Grey', image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Mercedes-Benz GLE 450', year: 2024, price: 11200000, type: 'SUV', status: 'In Service', mileage: '72 km', fuel: 'Hybrid', color: 'Polar White', image: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=900&q=85' }
]

export const customers = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone: '+91 98765 43210', deals: 2, status: 'Active' },
  { id: 2, name: 'Priya Iyer', email: 'priya.iyer@email.com', phone: '+91 98450 12680', deals: 1, status: 'Lead' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan.mehta@email.com', phone: '+91 99876 54521', deals: 3, status: 'Active' },
  { id: 4, name: 'Ananya Gupta', email: 'ananya.gupta@email.com', phone: '+91 98111 70943', deals: 0, status: 'Lead' }
]

export const deals = [
  { id: 'DL-1048', customer: 'Aarav Sharma', vehicle: 'Mahindra XUV700 AX7', amount: 2799000, stage: 'Negotiation', updated: 'Today, 10:24 AM' },
  { id: 'DL-1047', customer: 'Rohan Mehta', vehicle: 'Porsche Taycan 4S', amount: 18950000, stage: 'Finance Review', updated: 'Yesterday' },
  { id: 'DL-1046', customer: 'Priya Iyer', vehicle: 'BMW M4 Competition', amount: 15350000, stage: 'Test Drive', updated: 'Aug 21, 2026' }
]
