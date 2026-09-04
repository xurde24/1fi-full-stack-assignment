# 📱 1Fi Smartphone EMI Store

> A full-stack smartphone shopping experience with dynamic products, variants, EMI plans, cashback offers, and a demo checkout flow — built for the **1Fi SDE Full Stack Developer Internship Assignment**.

---

## 🚀 Live Demo

🌐 **Frontend:**  
https://1fi-full-stack-assignment.vercel.app

🔗 **Backend API:**  
https://onefi-assignment-api.onrender.com

---

## ✨ Features

### 📱 Product Experience

- 📦 Dynamic smartphone catalogue
- 🔗 Unique product URLs using slugs
- 💰 Product MRP and selling price
- 🏷️ Discount calculation
- 🖼️ Product imagery
- 🎨 Multiple color variants
- 💾 Multiple storage variants
- 💵 Variant-specific pricing
- 🖼️ Variant-specific images

### 💳 EMI Experience

- 💰 Multiple EMI plans per product
- 📅 Different EMI tenures
- 📊 Interest rate information
- 🎁 Cashback offers
- 🧮 Monthly EMI amount
- 🔘 EMI plan selection

### 🛒 Checkout

- 📋 Selected product summary
- 🎨 Selected variant
- 💾 Selected storage
- 💰 Product price
- 💳 Monthly EMI
- 📅 EMI tenure
- 📈 Interest rate
- 🎁 Cashback
- 🔄 Checkout persistence across page refresh
- ✅ Demo order completion flow

### ⚡ Engineering

- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🧭 React Router
- 🟢 Node.js + Express
- 🗄️ PostgreSQL
- 🔷 Prisma ORM
- 🔌 REST APIs
- 📱 Responsive design
- ⏳ Loading states
- ⚠️ Error states and retry handling
- 🔐 Environment-based configuration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 Frontend | React, TypeScript, Vite |
| 💅 Styling | Tailwind CSS |
| 🧭 Routing | React Router |
| ⚙️ Backend | Node.js, Express, TypeScript |
| 🗄️ Database | PostgreSQL |
| 🔷 ORM | Prisma |
| ☁️ Database Hosting | Neon |
| ▲ Frontend Hosting | Vercel |
| 🚀 Backend Hosting | Render |

---

## 🏗️ Architecture

```text
                    👤 User
                      │
                      ▼
        ┌─────────────────────────┐
        │   ⚛️ React Frontend     │
        │   TypeScript + Vite     │
        │      Tailwind CSS       │
        └────────────┬────────────┘
                     │
                     │ REST API
                     ▼
        ┌─────────────────────────┐
        │   🟢 Express Backend    │
        │       Node.js           │
        │      TypeScript         │
        └────────────┬────────────┘
                     │
                     │ Prisma ORM
                     ▼
        ┌─────────────────────────┐
        │    🗄️ PostgreSQL        │
        │         Neon            │
        └─────────────────────────┘
```

### 🔄 Request Flow

```text
User opens product page
        ↓
React Router reads product slug
        ↓
Frontend calls REST API
        ↓
Express receives request
        ↓
Prisma queries PostgreSQL
        ↓
Product + variants + EMI plans
        ↓
JSON response
        ↓
React renders product page
```

---

## 🗄️ Database Schema

The application uses three main entities:

```text
                    ┌──────────────────┐
                    │     📱 Product   │
                    │──────────────────│
                    │ id               │
                    │ name             │
                    │ slug             │
                    │ description      │
                    │ createdAt        │
                    │ updatedAt        │
                    └────────┬─────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
        ┌──────────────────┐   ┌──────────────────┐
        │  🎨 Variant      │   │  💳 EMI Plan     │
        │──────────────────│   │──────────────────│
        │ id               │   │ id               │
        │ productId        │   │ productId        │
        │ color            │   │ monthlyPayment   │
        │ storage          │   │ tenureMonths     │
        │ price            │   │ interestRate     │
        │ mrp              │   │ cashback         │
        │ imageUrl         │   └──────────────────┘
        └──────────────────┘
```

### 📱 Product

Stores the main smartphone information.

- `id`
- `name`
- `slug`
- `description`
- `createdAt`
- `updatedAt`

### 🎨 Variant

Stores the different configurations available for each smartphone.

- `id`
- `productId`
- `color`
- `storage`
- `price`
- `mrp`
- `imageUrl`

Each product has multiple variants.

### 💳 EMI Plan

Stores the EMI options available for each smartphone.

- `id`
- `productId`
- `monthlyPayment`
- `tenureMonths`
- `interestRate`
- `cashback`

Each product has multiple EMI plans.

---

## 📊 Seed Data

The database currently contains:

| 📦 Data | Count |
|---|---:|
| 📱 Smartphones | **3** |
| 🎨 Product Variants | **9** |
| 💳 EMI Plans | **9** |

### Products

- 🍎 iPhone 17 Pro
- 📱 Samsung Galaxy S24 Ultra
- 🔴 OnePlus 13

Each smartphone contains **3 variants** with variant-specific:

- 🎨 Color
- 💾 Storage
- 💰 Price
- 🏷️ MRP
- 🖼️ Image

---

## 🔌 API Endpoints

### ❤️ Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok",
  "message": "1Fi API is running"
}
```

### 📦 Get All Products

```http
GET /api/products
```

### 📱 Get Product by Slug

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/iphone-17-pro
```

The API returns the product together with its variants and EMI plans.

---

## 🧭 Application Routes

| Route | Description |
|---|---|
| `/` | 🏠 Homepage |
| `/#products` | 📱 Product catalogue |
| `/#how-it-works` | 🔄 How it works |
| `/#benefits` | ✨ Benefits |
| `/products/:slug` | 📱 Product details |
| `/checkout` | 🛒 Checkout |

---

## 🔗 Product URLs

Each smartphone has its own unique URL using a slug.

```text
/products/iphone-17-pro
/products/samsung-s24-ultra
/products/oneplus-13
```

This allows every product to be directly accessed and shared.

---

## 🔄 User Flow

```text
             🏠 Homepage
                  │
                  ▼
          📱 Browse Smartphones
                  │
                  ▼
            📦 Select Product
                  │
                  ▼
             🎨 Select Variant
                  │
                  ▼
             💳 Select EMI Plan
                  │
                  ▼
             🛒 Checkout
                  │
                  ▼
             📋 Review Order
                  │
                  ▼
          ✅ Complete Demo Order
                  │
                  ▼
              🎉 Success
```

---

## 💳 EMI Selection Flow

```text
Product
   │
   ├── 🎨 Variant
   │      ├── Color
   │      └── Storage
   │
   └── 💳 EMI Plans
          ├── Monthly Payment
          ├── Tenure
          ├── Interest Rate
          └── Cashback
                  │
                  ▼
            Select EMI Plan
                  │
                  ▼
              Checkout
```

---

## 🧮 Dynamic Data Flow

All product and EMI information is retrieved from the backend.

```text
                 🗄️ PostgreSQL
                       │
                       ▼
                  🔷 Prisma
                       │
                       ▼
                🟢 Express API
                       │
                       ▼
                 🔌 REST JSON
                       │
                       ▼
              ⚛️ React Frontend
                       │
                       ▼
                  👤 User
```

### Important

The frontend does **not** hardcode the product catalogue or EMI plans.

Product information is fetched dynamically from the API.

This includes:

- Product names
- Prices
- MRP
- Images
- Variants
- Storage
- EMI amounts
- Tenures
- Interest rates
- Cashback

---

## 🛒 Checkout Flow

The checkout page displays:

- 📱 Selected smartphone
- 🎨 Selected variant
- 💾 Storage
- 💰 Product price
- 💳 Monthly EMI
- 📅 EMI tenure
- 📈 Interest rate
- 🎁 Cashback

The selected checkout information is passed through React Router state and also persisted in `localStorage`.

This allows the selected checkout information to remain available after a browser refresh.

### ✅ Demo Order

The final checkout action is intentionally a demonstration flow.

```text
Review Order
     ↓
Complete Demo Order
     ↓
🎉 Order Complete
```

No real payment is processed.

---

## 📱 Responsive Design

The application is designed for:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

Responsive layouts are used across:

- Product catalogue
- Product details
- Variant selection
- EMI plans
- Checkout
- Navigation

---

## ⚡ Loading & Error Handling

The application includes:

### ⏳ Loading State

Displayed while product data is being fetched from the API.

### ⚠️ Error State

Displayed when the API request fails.

### 🔄 Retry

Users can retry loading the product catalogue without manually refreshing the page.

---

## 📂 Project Structure

```text
1fi-assignment/
│
├── 📁 client/
│   ├── 📁 public/
│   │   └── 📁 images/
│   │       ├── iphone-17-pro-deep-blue.jpg
│   │       ├── iphone-17-pro-silver.jpg
│   │       ├── iphone-17-pro-space-black.jpg
│   │       ├── oneplus-13-arctic-dawn.jpg
│   │       ├── oneplus-13-blue.jpg
│   │       ├── oneplus-13-midnight-black.jpg
│   │       ├── samsung-s24-ultra-titanium-black.jpg
│   │       ├── samsung-s24-ultra-titanium-blue.jpg
│   │       └── samsung-s24-ultra-titanium-gray.jpg
│   │
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductPage.tsx
│   │   │   └── CheckoutPage.tsx
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.ts
│   │   │
│   │   ├── 📁 types/
│   │   │   └── product.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── 📁 server/
│   ├── 📁 prisma/
│   │   ├── 📁 migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   └── productController.ts
│   │   │
│   │   ├── 📁 lib/
│   │   │   └── prisma.ts
│   │   │
│   │   ├── 📁 routes/
│   │   │   └── productRoutes.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── prisma.config.ts
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 💻 Local Setup

### Prerequisites

Install:

- Node.js 18+
- pnpm or npm
- PostgreSQL / Neon database

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/xurde24/1fi-full-stack-assignment.git
cd 1fi-assignment
```

---

### 2️⃣ Backend Setup

```bash
cd server
pnpm install
```

Create:

```text
server/.env
```

Add:

```env
DATABASE_URL="your_postgresql_connection_string"
PORT=5000
```

Generate Prisma Client:

```bash
pnpm prisma generate
```

Apply migrations:

```bash
pnpm prisma migrate deploy
```

Seed the database:

```bash
pnpm prisma db seed
```

Start the backend:

```bash
pnpm dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

### 3️⃣ Frontend Setup

Open another terminal:

```bash
cd client
pnpm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
pnpm dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend

```env
DATABASE_URL="your_database_connection_string"
PORT=5000
```

### Frontend

Development:

```env
VITE_API_URL=http://localhost:5000/api
```

Production:

```env
VITE_API_URL=https://onefi-assignment-api.onrender.com/api
```

> 🔒 Real database credentials and passwords must never be committed to the repository.

---

## 🗄️ Database Setup

From the `server` directory:

```bash
pnpm prisma migrate deploy
pnpm prisma db seed
```

The seed script creates:

```text
📱 3 Smartphones
      ↓
🎨 9 Variants
      ↓
💳 9 EMI Plans
```

---

## 📜 Scripts

### Client

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

### Server

```bash
pnpm dev
pnpm start
pnpm prisma db seed
```

---

## ☁️ Deployment

### ▲ Frontend

The React frontend is deployed using **Vercel**.

Production API:

```text
https://onefi-assignment-api.onrender.com/api
```

### 🚀 Backend

The Express backend is deployed using **Render**.

Backend:

```text
https://onefi-assignment-api.onrender.com
```

Health check:

```text
https://onefi-assignment-api.onrender.com/api/health
```

### 🗄️ Database

PostgreSQL is hosted using **Neon**.

The backend accesses PostgreSQL through Prisma.

Database credentials are stored using environment variables.

---

## 🎯 Design & Implementation Decisions

### 🔗 Slug-Based Product URLs

Products use unique slugs instead of exposing database IDs in the URL.

Example:

```text
/products/iphone-17-pro
```

### 🎨 Variant-Specific Images

Each product variant can have its own image.

Selecting a different color/storage combination updates the displayed product configuration.

### 💳 Product-Level EMI Plans

EMI plans are stored as database records and associated with their parent product.

### 🔄 Checkout Persistence

Checkout information is stored in both:

- React Router state
- `localStorage`

This allows the selected checkout configuration to survive a page refresh.

### 🧩 Component-Based Frontend

The frontend is separated into dedicated pages and services:

```text
HomePage
ProductPage
CheckoutPage
     │
     └── API Service
            │
            └── Backend REST API
```

---

## 🔒 Security

- 🔐 Real `.env` files are excluded from Git
- 🔑 Database credentials are stored through environment variables
- 🌐 Production frontend uses the deployed backend API
- 🛡️ Backend CORS is restricted to the application frontend and local development origins
- 🚫 No database credentials are included in source code

---

## 🎥 Demo

The project includes a short demonstration covering:

```text
🏠 Homepage
   ↓
📱 Product Catalogue
   ↓
📦 Product Details
   ↓
🎨 Variant Selection
   ↓
💳 EMI Selection
   ↓
🛒 Checkout
   ↓
✅ Demo Order Completion
```

---

## ✅ Assignment Checklist

### Product Requirements

- [x] 📱 3 smartphones
- [x] 🎨 3 variants for each smartphone
- [x] 🖼️ Variant-specific images
- [x] 💰 Variant-specific pricing
- [x] 🏷️ Product MRP and selling price
- [x] 🔗 Unique product URLs

### EMI Requirements

- [x] 💳 Multiple EMI plans
- [x] 💰 Monthly EMI amount
- [x] 📅 EMI tenure
- [x] 📈 Interest rate
- [x] 🎁 Cashback

### Backend Requirements

- [x] 🟢 Node.js + Express backend
- [x] 🔌 REST API
- [x] 🗄️ PostgreSQL database
- [x] 🔷 Prisma ORM
- [x] 📐 Database schema
- [x] 🌱 Database seed script
- [x] 🔄 Dynamic API-driven data

### Frontend Requirements

- [x] ⚛️ React
- [x] 📘 TypeScript
- [x] 🎨 Tailwind CSS
- [x] 🧭 React Router
- [x] 📱 Responsive UI
- [x] ⏳ Loading states
- [x] ⚠️ Error handling
- [x] 🎨 Variant selection
- [x] 💳 EMI selection
- [x] 🛒 Checkout flow

### Deployment

- [x] ▲ Frontend deployed on Vercel
- [x] 🚀 Backend deployed on Render
- [x] 🗄️ PostgreSQL hosted on Neon

### Documentation

- [x] 📖 README
- [x] 📐 Database schema
- [x] 🌱 Seed data
- [x] 🔌 API documentation
- [x] 🎥 Demo flow

---

## 📌 Scope

This project demonstrates:

📱 Smartphone discovery  
🎨 Product variant selection  
💳 EMI comparison  
🎁 Cashback information  
🛒 Checkout review  
✅ Demo order completion

The following are outside the scope of this assignment:

- Authentication
- Account management
- Real payment processing
- Persistent order management
- Production payment gateway integration

---

## 🙌 Built For

**1Fi SDE – Full Stack Developer Internship Assignment**

Built with ❤️ using React, TypeScript, Node.js, Express, Prisma and PostgreSQL.