import React from 'react';
import {
  OilImage,
  OilcheckImage,
  DentingPaintingImage,
  EmergencyAssistBannerImage,
  CategoryOverviewBannerImage,
} from '@assets/images';

import { ISVGProps } from '@assets/icons';

export interface IService {
  id: string;
  title: string;
  price: string;
  mrp: string;
  rating: number;
  image: React.FC<ISVGProps>;
  bullets?: string[];
  description?: string;
  highlight?: string;
  warranty?: string | string[];
  frequency?: string;
  pickup?: string;
  arrival?: string;
  mechanics?: string;
  feature1?: string;
  feature2?: string;
  includes?: string[];
}

export const EMERGENCY_SERVICE: IService = {
  id: 'emergency_roadside',
  title: 'Emergency Roadside Assistance',
  price: '2883',
  mrp: '3139',
  rating: 4.9,
  image: EmergencyAssistBannerImage,
  arrival: 'Arrival in 15–45 mins',
  mechanics: 'Nearby verified mechanics',
  feature1: 'On-spot repair / towing',
  feature2: 'Tractor breakdown support',
  includes: [
    'Quick response assistance',
    'Basic on-site inspection',
    'Minor repairs support',
    'Emergency towing (if required)',
  ],
  warranty: [
     'Service time depends on issue',
     'No fixed warranty on emergency jobs',
     'Immediate assistance priority'
  ]
};

export const CATEGORY_OVERVIEW_DATA: IService = {
  id: 'general_maintenance',
  title: 'General Maintenance Package',
  price: '2500',
  mrp: '1880',
  rating: 4.9,
  image: CategoryOverviewBannerImage,
  arrival: '4 hrs Service',
  mechanics: '3 Months Warranty',
  feature1: 'Recommended every 5000 km',
  feature2: 'Free Pick-up & Drop',
  includes: [
    'Engine oil change',
    'Oil filter replacement',
    'Air filter cleaning',
  ],
};

export interface IServiceCategory {
  category: string;
  services: IService[];
}

export const SERVICES_CATEGORIES = [
  { id: 'schedule_packages', title: 'Schedule Packages' },
  { id: 'denting_painting', title: 'Denting & Painting' },
];

export const SERVICES_DATA: IServiceCategory[] = [
  {
    category: 'schedule_packages',
    services: [
      {
        id: 's1',
        title: 'Basic Service',
        price: '2883',
        mrp: '3139',
        rating: 4.9,
        image: OilImage,
        highlight: '4 hrs Taken',
        warranty: '1000 Kms or 3 Months Warranty',
        frequency: 'Every 5000 kms (Recommended)',
        pickup: 'Free Pick-up & Drop',
        bullets: [
          'Engine oil change',
          'Oil filter replacement',
          'Air filter cleaning',
          'Brake check & inspection',
        ],
        description: 'Ensure your tractor runs smoothly with our essential maintenance package including oil change and full system inspection.',
      },
      {
        id: 's2',
        title: 'Advanced Service',
        price: '2500',
        mrp: '2800',
        rating: 4.9,
        image: OilcheckImage,
        highlight: '6 hrs Taken',
        warranty: '2000 Kms or 6 Months Warranty',
        bullets: [
          'Hydraulic oil check',
          'Brake adjustment',
          'Battery testing',
          'Cooling system inspection',
        ],
        description: 'A more comprehensive service for high-performance tractors working in demanding field conditions.',
      },
      {
        id: 's3',
        title: 'Complete Service',
        price: '4500',
        mrp: '5000',
        rating: 4.9,
        image: OilImage,
        highlight: '1 Day Taken',
        warranty: '5000 Kms or 1 Year Warranty',
        bullets: [
          'Complete engine servicing',
          'Engine oil & filter replacement',
          'Hydraulic oil change',
          'Fuel system cleaning',
        ],
        description: 'Our most thorough service package, covering every critical component to restore your tractor to peak efficiency.',
      },
    ],
  },
  {
    category: 'denting_painting',
    services: [
      {
        id: 'd1',
        title: 'Front Bumper Paint',
        price: '1500',
        mrp: '1880',
        rating: 4.9,
        image: DentingPaintingImage,
        bullets: [
          'Removal of Minor Dent & Scratches',
          'Grade A Primer Applied',
          'High Quality DuPont Paint',
          'Panel Rubbing Polishing & More',
        ],
        description: 'Professional paint and dent repair for your tractor bumper using high-grade automotive materials.',
      },
      {
        id: 'd2',
        title: 'Bonnet Paint',
        price: '2500',
        mrp: '2800',
        rating: 4.9,
        image: DentingPaintingImage,
        bullets: [
          'Removal of Minor Dent & Scratches',
          'Grade A Primer Applied',
          'High Quality DuPont Paint',
          'Clear Coat Protective Layer Paint',
        ],
        description: 'Full bonnet restoration service including scratch removal and premium clear coat protection.',
      },
      {
         id: 'd3',
         title: 'Full Body Dent Paint',
         price: '4500',
         mrp: '5000',
         rating: 4.9,
         image: DentingPaintingImage,
         bullets: [
           'Removal of Minor Dent & Scratches',
           'Grade A Primer Applied',
           'High Quality DuPont Paint',
           'Clear Coat Protective Layer Paint',
         ],
         description: 'Complete tractor body restoration from dent removal to a brand-new high-gloss paint finish.',
       },
    ],
  },
  {
    category: 'emergency',
    services: [EMERGENCY_SERVICE],
  },
  {
    category: 'general',
    services: [CATEGORY_OVERVIEW_DATA],
  },
];


