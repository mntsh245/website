

import connectDB from './lib/db.js';
import Menu from './models/Menu.js';

const dummyMenu = [
  {
    name: 'Galawati Kabab',
    description: 'Melt in mouth Lucknowi specialty mutton kababs.',
    price: 180,
    category: 'Kababs',
    image: '/images/galawati.jpg',
    isAvailable: true,
  },
  {
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with rich Lucknowi spices.',
    price: 250,
    category: 'Main Course',
    image: '/images/biryani.jpg',
    isAvailable: true,
  },
];

async function seedData() {
  await connectDB();
  await Menu.deleteMany({}); // Purana data clear karega
  await Menu.insertMany(dummyMenu);
  console.log('Database seeded successfully! 🎉');
  process.exit();
}

seedData();