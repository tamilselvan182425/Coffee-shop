# ☕ Coffee Haven - Setup Instructions

Follow these steps to get your Coffee Haven application running locally.

## Project Structure
- `server/`: Node.js + Express backend.
- `client/`: Vite + React + Tailwind frontend.

---

## 🛠 Prerequisites
- Node.js (v16 or higher)
- MongoDB (Running locally or on Atlas)

---

## 🏃 Getting Started

### 1. Clone & Configure Backend
- Open a terminal in the `server` directory.
- Create a `.env` file (one has been provided for you):
  ```env
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/coffee-shop
  JWT_SECRET=your_secret_key
  ```
- Install dependencies: `npm install`
- Seed the database: `node seed.js`
- Start the server: `npm run dev` (or `node server.js`)

### 2. Configure Frontend
- Open a terminal in the `client` directory.
- Install dependencies: `npm install`
- Start the development server: `npm run dev`

---

## 👤 Sample Credentials
To access the Admin Dashboard, use the following steps:
1. Register a new account on the website.
2. Manually change the `role` to `admin` in your MongoDB collection for that user.
3. Login and navigate to the Dashboard.

---

## 📂 Features
- **User Side**: Browse menu, Filter categories, Search, Cart management, Order history.
- **Admin Side**: Full Product CRUD, Manage Order Status, Revenue stats.
- **Auth**: JWT-based secure authentication.
