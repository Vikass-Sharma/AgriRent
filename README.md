# AgriRent - Agricultural Equipment Rental Platform

A full-stack web application for renting agricultural equipment, built with React frontend and Node.js/Express backend.

## 🚜 Features

- **User Authentication** with role-based access (Admin, Owner, User)
- **Equipment Browsing** with search and filtering
- **Real-time Booking System** with payment simulation
- **Owner Dashboard** for equipment management
- **Admin Dashboard** for platform management
- **Responsive Design** with modern UI

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- React Toastify for notifications
- Lucide React for icons

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- bcryptjs for authentication
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## ⚡ Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd agriRental_backend2-main
Install dependencies:
npm install
Create environment file:
cp .env.example .env
Update .env with your MongoDB connection string

Start the server:
# Development
npm run dev

# Production
npm start

npm start


Frontend Setup
Navigate to frontend directory:
cd agriRental_frontend2-main
Install dependencies:
npm install
Start the development server:
npm start
🔐 Default Login Credentials
Admin: admin@agrirent.com / admin123
Owner: owner@test.com / password123
User: user@test.com / password123
