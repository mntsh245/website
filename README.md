# Tunday Kababi — Aminabad, Lucknow

A modern restaurant website inspired by the iconic Tunday Kababi, built with Next.js 14, Prisma, Neon PostgreSQL, Tailwind CSS, and next-themes.

Features include:

- Dynamic menu powered by Neon PostgreSQL
- Prisma ORM integration
- Dark and light themes
- Interactive cart with GST and packaging charges
- WhatsApp order flow
- Category filters and menu search
- Catering enquiry page
- Responsive design for desktop and mobile

---

## Tech Stack

- Next.js 14 (App Router)
- React
- Tailwind CSS
- Prisma ORM
- Neon PostgreSQL
- next-themes

---

## Getting Started

Install dependencies:

```bash
npm install
```

Create your environment file:

```env
DATABASE_URL=your_neon_database_url
```

Push the database schema:

```bash
npx prisma db push
```

Seed the database with sample menu items:

```bash
node prisma/seed.js
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

For production:

```bash
npm run build
npm start
```

---

## Project Structure

```txt
app/
│
├── api/
│   └── menu/
│       └── route.js
│
├── menu/
│   └── page.jsx
│
├── catering/
│   └── page.jsx
│
├── outlets/
│   └── page.jsx
│
├── layout.js
├── page.jsx
├── providers.jsx
└── globals.css

components/
├── CartDrawer.jsx
├── DishCard.jsx
├── Footer.jsx
├── Navbar.jsx
├── StarRating.jsx
└── ThemeToggle.jsx

context/
└── CartContext.jsx

lib/
├── menu.js
└── site.js

prisma/
├── schema.prisma
└── seed.js
```

---

## Database

The application uses Neon PostgreSQL with Prisma ORM.

Schema file:

```txt
prisma/schema.prisma
```

Generate Prisma client:

```bash
npx prisma generate
```

Apply schema changes:

```bash
npx prisma db push
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Features

### Menu System

- Dynamic menu fetched from the database
- Veg/Non-Veg segregation
- Bestseller highlights
- Half and full portion pricing
- Category filtering
- Search functionality

### Cart System

- Add/remove items
- Quantity management
- GST calculation
- Packaging charge calculation
- WhatsApp order generation

### Catering

- Catering packages
- Cost estimation
- Contact and enquiry form

### Theme Support

Dark Mode:

- Royal Awadhi theme
- Gold accents
- Charcoal backgrounds

Light Mode:

- Royal Cream theme
- Warm amber accents
- Clean restaurant-inspired design

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
```

Do not commit:

```txt
.env
.env.local
node_modules
.next
```

---

## Deployment

This project can be deployed on:

- Vercel
- Railway
- Render

For Vercel:

1. Import the GitHub repository
2. Add the `DATABASE_URL` environment variable
3. Deploy

---

## Author

Built as a full-stack restaurant website project using Next.js, Prisma, and Neon PostgreSQL.


Tunday Kababi — Aminabad, Lucknow
A modern restaurant website inspired by the iconic Tunday Kababi, built with Next.js 14, Prisma, Neon PostgreSQL, Tailwind CSS, and next-themes.

Features include:

Dynamic menu powered by Neon PostgreSQL
Prisma ORM integration
Dark and light themes
Interactive cart with GST and packaging charges
WhatsApp order flow
Category filters and menu search
Catering enquiry page
Responsive design for desktop and mobile
Tech Stack
Next.js 14 (App Router)
React
Tailwind CSS
Prisma ORM
Neon PostgreSQL
next-themes
Getting Started
Install dependencies:

npm install
Create your environment file:

DATABASE_URL=your_neon_database_url
Push the database schema:

npx prisma db push
Seed the database with sample menu items:

node prisma/seed.js
Start the development server:

npm run dev
Open:

http://localhost:3000
For production:

npm run build
npm start
Project Structure
app/
│
├── api/
│   └── menu/
│       └── route.js
│
├── menu/
│   └── page.jsx
│
├── catering/
│   └── page.jsx
│
├── outlets/
│   └── page.jsx
│
├── layout.js
├── page.jsx
├── providers.jsx
└── globals.css

components/
├── CartDrawer.jsx
├── DishCard.jsx
├── Footer.jsx
├── Navbar.jsx
├── StarRating.jsx
└── ThemeToggle.jsx

context/
└── CartContext.jsx

lib/
├── menu.js
└── site.js

prisma/
├── schema.prisma
└── seed.js
Database
The application uses Neon PostgreSQL with Prisma ORM.

Schema file:

prisma/schema.prisma
Generate Prisma client:

npx prisma generate
Apply schema changes:

npx prisma db push
Open Prisma Studio:

npx prisma studio
Features
Menu System
Dynamic menu fetched from the database
Veg/Non-Veg segregation
Bestseller highlights
Half and full portion pricing
Category filtering
Search functionality
Cart System
Add/remove items
Quantity management
GST calculation
Packaging charge calculation
WhatsApp order generation
Catering
Catering packages
Cost estimation
Contact and enquiry form
Theme Support
Dark Mode:

Royal Awadhi theme
Gold accents
Charcoal backgrounds
Light Mode:

Royal Cream theme
Warm amber accents
Clean restaurant-inspired design
Environment Variables
Create a .env file:

DATABASE_URL=your_neon_database_url
Do not commit:

.env
.env.local
node_modules
.next
Deployment
This project can be deployed on:

Vercel
Railway
Render
For Vercel:

Import the GitHub repository
Add the DATABASE_URL environment variable
Deploy
Author
Built as a full-stack restaurant website project using Next.js, Prisma, and Neon PostgreSQL.
