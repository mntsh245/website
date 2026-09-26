import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const menuItems = [
  // Kababs
  { name: "Tunday Galouti Kabab (Mutton)", description: "Melt-in-mouth mutton kabab made with 160 secret Awadhi spices.", category: "Kababs", priceHalf: 120, priceFull: 220, isVeg: false, isBestseller: true },
  { name: "Galouti Kabab (Chicken)", description: "Tender chicken galouti kabab prepared with aromatic spices and ghee.", category: "Kababs", priceHalf: 100, priceFull: 180, isVeg: false, isBestseller: false },
  { name: "Boti Kabab (Mutton)", description: "Marinated mutton cubes slow-cooked in rich spices.", category: "Kababs", priceHalf: 160, priceFull: 300, isVeg: false, isBestseller: true },
  { name: "Seekh Kabab (Chicken)", description: "Minced chicken seasoned with fresh herbs and chargrilled.", category: "Kababs", priceHalf: 110, priceFull: 200, isVeg: false, isBestseller: false },

  // Breads
  { name: "Ulte Tawe Ka Paratha", description: "Traditional saffron-infused soft layered bread.", category: "Breads", priceHalf: null, priceFull: 30, isVeg: true, isBestseller: true },
  { name: "Mughlai Paratha", description: "Crispy fried layered roti served hot.", category: "Breads", priceHalf: null, priceFull: 40, isVeg: true, isBestseller: false },
  { name: "Rumali Roti", description: "Paper-thin traditional bread made over hot dome tawa.", category: "Breads", priceHalf: null, priceFull: 15, isVeg: true, isBestseller: false },
  { name: "Sheermal", description: "Sweet, saffron-flavored flatbread baked in tandoor.", category: "Breads", priceHalf: null, priceFull: 50, isVeg: true, isBestseller: false },

  // Main Course
  { name: "Mutton Chaap", description: "Slow-cooked rib chops in dense, aromatic gravy.", category: "Main Course", priceHalf: 180, priceFull: 340, isVeg: false, isBestseller: true },
  { name: "Chicken Qorma", description: "Rich Awadhi chicken gravy cooked with yogurt & kewra.", category: "Main Course", priceHalf: 150, priceFull: 280, isVeg: false, isBestseller: false },
  { name: "Mutton Stew", description: "Thick mutton curry cooked with whole spices & onions.", category: "Main Course", priceHalf: 170, priceFull: 320, isVeg: false, isBestseller: false },
  { name: "Paneer Butter Masala", description: "Cottage cheese cubes in rich cashew creamy gravy.", category: "Main Course", priceHalf: 120, priceFull: 220, isVeg: true, isBestseller: false },

  // Biryani & Rice
  { name: "Lucknowi Mutton Dum Biryani", description: "Authentic Awadhi dum biryani cooked with basmati rice.", category: "Biryani & Rice", priceHalf: 180, priceFull: 320, isVeg: false, isBestseller: true },
  { name: "Chicken Dum Biryani", description: "Flavorsome chicken biryani with traditional spices.", category: "Biryani & Rice", priceHalf: 140, priceFull: 250, isVeg: false, isBestseller: false },
  { name: "Veg Dum Biryani", description: "Basmati rice cooked with fresh seasonal vegetables.", category: "Biryani & Rice", priceHalf: 100, priceFull: 180, isVeg: true, isBestseller: false },

  // Desserts
  { name: "Royal Shahi Phirni", description: "Ground rice pudding flavored with saffron & silver leaf.", category: "Desserts", priceHalf: null, priceFull: 60, isVeg: true, isBestseller: true },
  { name: "Gulab Jamun (2 Pcs)", description: "Soft cottage cheese balls fried & soaked in syrup.", category: "Desserts", priceHalf: null, priceFull: 50, isVeg: true, isBestseller: false }
];

export async function GET() {
  try {
    await prisma.menuItem.deleteMany({});
    await prisma.menuItem.createMany({ data: menuItems });
    return NextResponse.json({ success: true, message: "Database seeded successfully!", count: menuItems.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}