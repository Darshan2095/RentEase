# RentEase - Furniture & Appliance Rental Platform

RentEase is a full-stack rental management platform that allows users to rent furniture and home appliances online.  
The platform provides a complete digital rental experience including product browsing, cart management, order processing, rental tracking, extensions, returns, and admin-side inventory management.

---

##  Overview

Buying furniture and appliances can be expensive for students, working professionals, and people relocating temporarily. RentEase solves this problem by providing a flexible rental platform where users can rent essential products based on their needs.

The system manages the complete rental lifecycle from product selection to order completion and return processing.

---

#  Features

##  Customer Features

### Authentication
- User registration
- Secure login
- JWT based authentication
- Protected routes

### Product Browsing
- Browse furniture and appliances
- View product details
- Category-based products
- Featured products
- Product availability tracking

### Cart Management
- Add products to cart
- Update product quantity
- Remove cart items
- Rental duration selection

### Checkout & Orders
- Address information
- Order summary
- Place rental orders
- Track order status

Order Flow:

```
PLACED
   ↓
CONFIRMED
   ↓
SHIPPED
   ↓
DELIVERED
```

### Rental Management
- View active rentals
- Track rental duration
- Extend rental period
- Return rented products

Rental Flow:

```
ACTIVE
   ↓
EXTENDED
   ↓
RETURNED
```

---

# 🛠️ Admin Features

## Dashboard Management

Admin can:

- Manage products
- Manage categories
- View customer orders
- Update order status
- Manage active rentals
- Handle returns
- Track inventory

---

## Product Management

Features:

- Add new products
- Update products
- Delete products
- Manage stock availability

Product details:

- Images
- Monthly rent
- Security deposit
- Rental duration
- Specifications

---

## Order Management

Admin controls the complete order workflow:

```
Customer Checkout
        ↓
Order Created
        ↓
Admin Confirmation
        ↓
Delivery
        ↓
Rental Creation
```

When an order is delivered:

- Rental is automatically generated
- Product stock decreases automatically

---

## Inventory Management

Automatic inventory updates:

Product rented:

```
availableStock - quantity
```

Product returned:

```
availableStock + quantity
```

---

#  Tech Stack

## Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Query
- Framer Motion
- Lucide Icons

---

## Backend

- Next.js API Routes
- Node.js
- MongoDB
- Mongoose ODM

---

## Authentication & Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected APIs
- Role Based Access Control

---

## Database

MongoDB Collections:

```
Database

├── Users
├── Categories
├── Products
├── Cart
├── Orders
└── Rentals
```

---

#  Project Structure

```
RentEase

src
│
├── app
│   ├── api
│   │   ├── auth
│   │   ├── products
│   │   ├── cart
│   │   ├── orders
│   │   └── rentals
│   │
│   ├── dashboard
│   ├── admin
│   └── products
│
├── components
│   └── ui
│
├── features
│
│   ├── auth
│   ├── products
│   ├── cart
│   ├── orders
│   └── rentals
│
├── models
│
│   ├── User
│   ├── Product
│   ├── Category
│   ├── Cart
│   ├── Order
│   └── Rental
│
├── lib
│
└── hooks
```

---

#  Authentication Flow

```
User Login

     ↓

JWT Token Created

     ↓

Stored Securely

     ↓

Protected API Access

     ↓

Role Verification
```

Roles:

```
USER

ADMIN
```

---

#  Main Modules

## Product Module

Handles:

- Product listing
- Product details
- Category connection
- Stock information


---

## Cart Module

Flow:

```
Product

 ↓

Add To Cart

 ↓

Checkout

 ↓

Order
```

---

## Order Module

Handles:

- Order creation
- Customer order history
- Admin order management
- Status updates


---

## Rental Module

Handles:

- Rental creation
- Active rentals
- Rental extensions
- Product returns


---

#  Installation Guide


## Clone Repository

```bash
git clone https://github.com/Darshan2095/RentEase.git
```

Go inside project:

```bash
cd RentEase
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create:

```
.env.local
```

Add:

```env
MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## Run Development Server

```bash
npm run dev
```

Application:

```
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

Run:

```bash
npm start
```

---

#  API Routes


## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Products

```
GET    /api/products

POST   /api/products

PATCH  /api/products/:id

DELETE /api/products/:id
```

---

## Cart

```
GET    /api/cart

POST   /api/cart

PATCH  /api/cart/:id

DELETE /api/cart/:id
```

---

## Orders

```
GET /api/orders

POST /api/orders

PATCH /api/orders/:id/status
```

---

## Rentals

```
GET /api/rentals

PATCH /api/rentals/:id/extend

PATCH /api/rentals/:id/return
```

---

#  Responsive Design

Supported devices:

✔ Desktop  
✔ Tablet  
✔ Mobile  

Features:

- Responsive layouts
- Adaptive components
- Mobile-friendly navigation

---

#  Testing Completed

Tested workflows:

✔ Authentication  
✔ Product creation  
✔ Cart operations  
✔ Checkout process  
✔ Order lifecycle  
✔ Rental generation  
✔ Rental extension  
✔ Product return  
✔ Stock updates  

---

#  Future Enhancements

Planned improvements:

- Payment Gateway Integration
- Wishlist
- Reviews & Ratings
- Email Notifications
- AI Recommendations
- Analytics Dashboard
- Delivery Tracking
- Mobile Application

---

#  Project Status

Current Version:

```
MVP Completed ✅
```

Completed:

✔ Full authentication  
✔ Customer workflow  
✔ Admin workflow  
✔ Rental lifecycle  
✔ Inventory automation  
✔ Production build ready  

---

#  Developer

Developed by:

**Darshan Babariya**

Full Stack Developer

---

#  Support

If you like this project, consider giving it a ⭐ on GitHub.
