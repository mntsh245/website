import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

const menuItems = [
  // --- KABAB (SPECIALTIES) ---
  {
    name: "Aminabad Dawat Galwati Kabab (Mutton)",
    description: "Melt-in-mouth mutton kabab made with 160 secret Awadhi spices cooked on iron tawa.",
    category: "Kababs",
    priceHalf: 120,
    priceFull: 220,
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
  },
  {
    name: "Galouti Kabab (Chicken)",
    description: "Tender chicken galouti kabab prepared with aromatic spices and royal Ghee.",
    category: "Kababs",
    priceHalf: 100,
    priceFull: 180,
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
  },
  {
    name: "Boti Kabab (Mutton)",
    description: "Marinated mutton cubes slow-cooked in rich spices and roasted to perfection.",
    category: "Kababs",
    priceHalf: 160,
    priceFull: 300,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
  },
  {
    name: "Seekh Kabab (Chicken)",
    description: "Minced chicken seasoned with fresh herbs and chargrilled over charcoal.",
    category: "Kababs",
    priceHalf: 110,
    priceFull: 200,
    isVeg: false,
    isBestseller: false,
    isSpicy: true,
  },

  // --- BREADS (ROTI & PARATHA) ---
  {
    name: "Ulte Tawe Ka Paratha",
    description: "Traditional saffron-infused soft layered bread baked on an inverted tawa.",
    category: "Breads",
    priceHalf: null,
    priceFull: 30,
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
  },
  {
    name: "Mughlai Paratha",
    description: "Crispy fried layered roti served hot and fresh with kababs.",
    category: "Breads",
    priceHalf: null,
    priceFull: 40,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
  },
  {
    name: "Rumali Roti",
    description: "Paper-thin traditional bread made over hot dome tawa.",
    category: "Breads",
    priceHalf: null,
    priceFull: 15,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
  },
  {
    name: "Sheermal",
    description: "Sweet, saffron-flavored traditional flatbread cooked in tandoor.",
    category: "Breads",
    priceHalf: null,
    priceFull: 50,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
  },

  // --- MAIN COURSE (GRAVY DISHES) ---
  {
    name: "Mutton Chaap",
    description: "Slow-cooked rib chops marinated in dense, aromatic spicy gravy.",
    category: "Main Course",
    priceHalf: 180,
    priceFull: 340,
    isVeg: false,
    isBestseller: true,
    isSpicy: true,
  },
  {
    name: "Chicken Qorma",
    description: "Rich Awadhi chicken gravy cooked with yogurt, fried onions, and kewra water.",
    category: "Main Course",
    priceHalf: 150,
    priceFull: 280,
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
  },
  {
    name: "Mutton Stew",
    description: "Homestyle thick mutton curry cooked with whole spices and sliced onions.",
    category: "Main Course",
    priceHalf: 170,
    priceFull: 320,
    isVeg: false,
    isBestseller: false,
    isSpicy: true,
  },
  {
    name: "Paneer Butter Masala",
    description: "Cottage cheese cubes cooked in rich tomato and cashew creamy gravy.",
    category: "Main Course",
    priceHalf: 120,
    priceFull: 220,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
  },

  // --- BIRYANI & RICE ---
  {
    name: "Lucknowi Mutton Dum Biryani",
    description: "Authentic Awadhi dum biryani cooked on low heat with fragrant long-grain basmati rice.",
    category: "Biryani & Rice",
    priceHalf: 180,
    priceFull: 320,
    isVeg: false,
    isBestseller: true,
    isSpicy: false,
  },
  {
    name: "Chicken Dum Biryani",
    description: "Flavorsome chicken biryani cooked with traditional Awadhi spices.",
    category: "Biryani & Rice",
    priceHalf: 140,
    priceFull: 250,
    isVeg: false,
    isBestseller: false,
    isSpicy: false,
  },
  {
    name: "Veg Dum Biryani",
    description: "Basmati rice cooked with fresh seasonal vegetables and aromatic herbs.",
    category: "Biryani & Rice",
    priceHalf: 100,
    priceFull: 180,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
  },

  // --- DESSERTS & BEVERAGES ---
  {
    name: "Royal Shahi Phirni",
    description: "Traditional ground rice pudding flavored with saffron, cardamom, and topped with silver leaf in clay pot.",
    category: "Desserts",
    priceHalf: null,
    priceFull: 60,
    isVeg: true,
    isBestseller: true,
    isSpicy: false,
  },
  {
    name: "Gulab Jamun (2 Pcs)",
    description: "Soft cottage cheese balls fried and soaked in cardamom sugar syrup.",
    category: "Desserts",
    priceHalf: null,
    priceFull: 50,
    isVeg: true,
    isBestseller: false,
    isSpicy: false,
  }
];

async function main() {
  console.log('Seeding Aminabad Dawat dishes into Neon DB...');
  
  // Clear existing items
  await prisma.menuItem.deleteMany({});

  // Insert all dishes
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }

  console.log(`Successfully added ${menuItems.length} dishes to Database!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });