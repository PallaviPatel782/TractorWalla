import {
  Product1Image,
  Product2Image,
} from '@assets/images';

export const PARTS_CATEGORIES = [
  { id: 'engine_oil', title: 'Engine Oil' },
  { id: 'brake_kits', title: 'Brake Service Kits' },
];

export const PARTS_DATA = [
  {
    category: 'engine_oil',
    kits: [
      {
        id: '1',
        title: 'Castrol Basic Kit - Mahindra 295 DI Turbo',
        badge: 'MAHINDRA 295 DI TURBO',
        price: '2883',
        mrp: '3139',
        rating: 4.9,
        image: Product1Image,
        bullets: [
          'Bosch 27 Diesel Filter Kit',
          'Bosch 31 Engine Oil Filter',
          'Castrol Engine Oil 7.5 Ltr CH4',
          'Free 15-Point Inspection',
        ],
        description: 'Complete engine oil replacement kit specifically designed for Mahindra 295 DI Turbo tractors.',
      },
      {
        id: '2',
        title: 'Castrol Basic Kit',
        badge: 'UNIVERSAL ENGINE KIT',
        price: '3856',
        mrp: '4184',
        rating: 4.9,
        image: Product2Image,
        bullets: [
          'Bosch 23 Air Filter',
          'Bosch 31 Engine Oil Filter',
          'Castrol Engine Oil 7.5 Ltr CH4',
          'Free Coolant Top-up',
        ],
        description: 'Premium service kit with air filter inclusion for extended engine life.',
      },
    ],
  },
  {
    category: 'brake_kits',
    kits: [
      {
        id: '3',
        title: 'Advanced Brake Repair Kit',
        badge: 'MAHINDRA 295 DI TURBO',
        price: '2883',
        mrp: '3139',
        rating: 4.9,
        image: Product1Image,
        bullets: [
          'Brake Shoe Replacement',
          'Brake Drum Inspection',
          'Brake Cable Adjustment',
          'Brake Pedal Lubrication',
        ],
        description: 'Comprehensive brake maintenance kit to ensure operator safety and braking efficiency.',
      },
      {
        id: '4',
        title: 'Rear Brake Shoe',
        badge: 'POST-2020 MODELS',
        price: '3856',
        mrp: '4184',
        rating: 4.9,
        image: Product2Image,
        bullets: [
          'Opening & Fitting of Rear Pads',
          'Real Brake Shoes Replacement',
          'Set of 2 Rear Brake Pads',
          'Inspection of Calipers',
        ],
        description: 'Specific rear axle brake shoe replacement service kit.',
      },
    ],
  },
];

// Simplified list for the Home screen slider
export const HOME_PARTS_LIST = [
  { id: '1', Image: Product1Image, name: 'Utto 5 Ltr- Wet Disc Brake Oil Mobil', price: 1231, mrp: 1960, discount: '10% Off', rating: 4.9 },
  { id: '2', Image: Product2Image, name: 'Transmax Manual Gear Oil', price: 1231, mrp: 1960, discount: '10% Off', rating: 4.9 },
  { id: '3', Image: Product1Image, name: 'Tractor Coolant 5L', price: 1231, mrp: 1960, discount: '10% Off', rating: 4.9 },
];
