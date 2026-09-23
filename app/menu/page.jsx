    'use client';

    import React, { useState } from 'react';
    import Image from 'next/image';
    import { useCart } from '@/app/providers';
    // Dummy Menu Data for Tunday Kababi
    const MENU_ITEMS = [
    {
        id: '1',
        name: 'Mutton Galouti Kebab',
        category: 'Kebabs',
        price: 180,
        isVeg: false,
        rating: 4.9,
        description: 'Iconic melt-in-mouth mutton kebabs prepared with 160 secret spices.',
        image: '/kabab-paratha.png',
    },
    {
        id: '2',
        name: 'Mughlai Paratha',
        category: 'Breads',
        price: 40,
        isVeg: true,
        rating: 4.8,
        description: 'Flaky, deep-fried Indian bread cooked on a heavy iron tawa.',
        image: '/plate.png',
    },
    {
        id: '3',
        name: 'Chicken Dum Biryani',
        category: 'Main Course',
        price: 260,
        isVeg: false,
        rating: 4.7,
        description: 'Aromatic Lucknawi biryani cooked slow on dum with tender chicken pieces.',
        image: '/kabab-paratha.png',
    },
    {
        id: '4',
        name: 'Paneer Tikka Kebab',
        category: 'Kebabs',
        price: 160,
        isVeg: true,
        rating: 4.5,
        description: 'Cottage cheese marinated in rich spices and roasted in tandoor.',
        image: '/plate.png',
    },
    {
        id: '5',
        name: 'Chicken Korma',
        category: 'Main Course',
        price: 280,
        isVeg: false,
        rating: 4.6,
        description: 'Rich and creamy gravy prepared with aromatic cashew nut paste and spices.',
        image: '/kabab-paratha.png',
    },
    {
        id: '6',
        name: 'Shahi Tukda',
        category: 'Desserts',
        price: 90,
        isVeg: true,
        rating: 4.9,
        description: 'Traditional Royal Lucknawi dessert topped with thickened milk (rabri).',
        image: '/plate.png',
    },
    ];

    const CATEGORIES = ['All', 'Kebabs', 'Main Course', 'Breads', 'Desserts'];

    export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart, cart } = useCart();

    // Filter Logic
    const filteredItems = MENU_ITEMS.filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-white pt-24 pb-16 px-4 sm:px-8">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto text-center mb-10">
            <span className="text-amber-500 font-serif italic text-lg">Authentic Flavors</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold mt-1">Our Royal Menu</h1>
            <p className="text-gray-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Explore the timeless taste of Aminabad. Freshly prepared everyday using heritage recipes.
            </p>

            {/* SEARCH & FILTERS */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                        : 'bg-neutral-900 text-gray-400 hover:text-white border border-neutral-800'
                    }`}
                >
                    {cat}
                </button>
                ))}
            </div>

            {/* Search Box */}
            <div className="w-full sm:w-64">
                <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                />
            </div>
            </div>
        </div>

        {/* DISHES GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
            const inCart = cart.find((i) => i.id === item.id);

            return (
                <div
                key={item.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-600/50 transition group"
                >
                <div>
                    {/* Dish Image */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-neutral-950">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain group-hover:scale-105 transition duration-300"
                    />
                    {/* Veg/Non-Veg Badge */}
                    <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-neutral-700">
                        <span
                        className={`w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        />
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    </div>

                    {/* Dish Info */}
                    <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-500 transition">
                        {item.name}
                    </h3>
                    <span className="text-amber-500 font-bold text-lg">₹{item.price}</span>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2">
                    {item.description}
                    </p>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-xs text-amber-500 font-medium">★ {item.rating} Rating</span>
                    <button
                    onClick={() => addToCart(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        inCart
                        ? 'bg-green-600/20 text-green-400 border border-green-600/40'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                    >
                    {inCart ? `Added (${inCart.quantity})` : '+ Add to Order'}
                    </button>
                </div>
                </div>
            );
            })}
        </div>

        {filteredItems.length === 0 && (
            <div className="text-center text-gray-500 my-16">
            No dishes found for &quot;{searchQuery}&quot;.
            </div>
        )}
        </div>
    );
    }