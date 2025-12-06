<div align="center">

# 🛒 HiMart - Frontend

### Modern E-Commerce Platform | React SPA | Full-Featured Shopping Experience

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.6.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.12.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>


## 📋 Table of Contents

- [About](#-about)
- [Purpose](#-purpose)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Author](#-author)
- [Made By](#-made-by)

---

## 🎯 About

**HiMart Frontend** is a modern, responsive e-commerce Single Page Application built with React 19 and Vite. It provides a seamless shopping experience with features like real-time product search, cart management with guest/user synchronization, dynamic product categorization, and smooth animations. Designed with accessibility, performance, and user experience at its core.

**Keywords**: E-Commerce Frontend, React SPA, Shopping Cart, Product Catalog, Vite, Tailwind CSS, Modern UI/UX, Responsive Design, Dark Mode, Animation Library

---

## 🎨 Purpose

This frontend application serves multiple purposes:

- **Customer Shopping Experience**: Intuitive product browsing, searching, and purchasing interface
- **Guest Cart Management**: Seamless shopping without requiring immediate login
- **User Authentication**: Secure login with cart synchronization for registered users
- **Seller Dashboard**: Dedicated interface for sellers to manage products and inventory
- **Responsive Design**: Mobile-first approach ensuring perfect experience across all devices
- **Performance Optimization**: Fast page loads with lazy loading and code splitting

---

## ✨ Features

### 🛍️ **Shopping Experience**

- ✅ **Product Catalog** - Browse products with category filtering and sorting
- ✅ **Smart Search** - Real-time product search with debouncing (min 2 characters)
- ✅ **Product Details** - Comprehensive product information with image gallery
- ✅ **Shopping Cart** - Add, remove, update quantities with persistent storage
- ✅ **Guest Cart** - Shop without login, cart saved in localStorage
- ✅ **Cart Sync** - Automatic merge of guest cart when logging in
- ✅ **Checkout Flow** - Streamlined checkout process with order summary

### 🎨 **User Interface**

- ✅ **Dark Mode** - Beautiful dark/light theme with system preference detection
- ✅ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- ✅ **Responsive Design** - Mobile-first approach with tablet and desktop optimization
- ✅ **Modern UI Components** - Headless UI for accessible, unstyled components
- ✅ **Toast Notifications** - Custom-styled notifications matching app theme
- ✅ **Loading States** - Skeleton screens and loading indicators
- ✅ **Empty States** - Beautiful empty cart and search states

### 🔐 **Authentication & User Management**

- ✅ **User Registration** - Create account with email verification
- ✅ **Social Login** - Google and Facebook OAuth integration
- ✅ **Session Management** - JWT-based authentication with auto-refresh
- ✅ **User Profile** - Manage personal information and addresses
- ✅ **Logout Protection** - Clear navigation history on logout
- ✅ **Protected Routes** - Role-based access control for user/seller pages

### 🏪 **Seller Features**

- ✅ **Seller Dashboard** - Comprehensive seller control panel
- ✅ **Product Management** - Add, edit, delete products with image upload
- ✅ **Inventory Tracking** - Real-time stock management
- ✅ **Sales Analytics** - View sales statistics and performance metrics
- ✅ **File Upload** - Drag-and-drop image upload with preview

### 🚀 **Performance & SEO**

- ✅ **Code Splitting** - Lazy loading for optimal bundle size
- ✅ **Image Optimization** - Lazy loading and responsive images
- ✅ **Debounced Search** - Optimized API calls (300ms delay)
- ✅ **Memoization** - React.memo and useMemo for performance
- ✅ **SEO Friendly** - React Helmet for dynamic meta tags
- ✅ **Fast Development** - Vite with Hot Module Replacement

---

## 🛠️ Technology Stack

### **Core**

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

- **React 19.1.0** - Latest React with hooks and concurrent features
- **Vite 6.3.5** - Next-generation frontend build tool
- **React Router 7.6.1** - Declarative routing for React
- **Axios 1.9.0** - Promise-based HTTP client

### **UI & Styling**

<div align="center">

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Headless UI](https://img.shields.io/badge/Headless_UI-66E3FF?style=for-the-badge&logo=headlessui&logoColor=black)

</div>

- **Tailwind CSS 4.1.7** - Utility-first CSS framework
- **Framer Motion 12.12.2** - Production-ready animation library
- **Headless UI 2.2.4** - Unstyled, accessible UI components
- **React Icons 5.5.0** - Popular icon library
- **Tailwind Scrollbar Hide 2.0.0** - Custom scrollbar utilities

### **Form & Data Management**

- **React Hook Form 7.56.4** - Performant form validation
- **React Toastify 11.0.5** - Toast notification library
- **React Helmet 3.0.2** - Document head manager for SEO
- **Lodash Debounce 4.0.8** - Debouncing utility

### **Additional Features**

- **React Dropzone 14.3.8** - File upload with drag-and-drop
- **React ChartJS 2 5.3.0** - Chart visualization for analytics

---

## 📁 Project Structure

```
hi-mart-frontend/
├── 📂 public/                   # Static assets
├── 📂 src/
│   ├── 📂 assets/              # Images, icons, media
│   │
│   ├── 📂 components/           # Reusable components
│   │   ├── HomeSearchBar.jsx   # Header search with autocomplete
│   │   ├── navigation/         # Navbar, Footer components
│   │   │   ├── DashboardNavbar.jsx
│   │   │   ├── RegularFooter.jsx
│   │   │   └── RegularNavbar.jsx
│   │   └── ui/                 # UI components
│   │       ├── FileUploader.jsx
│   │       └── PriceInput.jsx
│   │
│   ├── 📂 contexts/             # React Context providers
│   │   ├── useAuth.jsx         # Authentication context
│   │   ├── useCart.jsx         # Cart management context
│   │   └── useSellerAuth.jsx   # Seller authentication
│   │
│   ├── 📂 data/                 # Static data
│   │   ├── categories.js       # Product categories
│   │   └── countryCodes.json   # Country calling codes
│   │
│   ├── 📂 hooks/                # Custom React hooks
│   │   └── useDarkMode.js      # Dark mode toggle
│   │
│   ├── 📂 libs/                 # Utility libraries
│   │   └── motion.js           # Framer Motion variants
│   │
│   ├── 📂 routes/               # Page components
│   │   ├── about-us/           # About page
│   │   ├── auth/               # Login, Signup, Logout
│   │   ├── become-seller/      # Seller registration
│   │   ├── cart/               # Cart and Checkout
│   │   ├── fallbacks/          # Error pages (404, 401, etc.)
│   │   ├── muslim-mart/        # Muslim products section
│   │   ├── products/           # Product listing and details
│   │   ├── profile/            # User profile
│   │   └── seller/             # Seller dashboard
│   │
│   ├── App.jsx                 # Main App component (Home page)
│   ├── Layout.jsx              # Root layout wrapper
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
│
├── 📄 eslint.config.js         # ESLint configuration
├── 📄 index.html               # HTML entry point
├── 📄 package.json             # Dependencies
├── 📄 vite.config.js           # Vite configuration
└── 📄 README.md                # This file
```

---

## 🗺️ Routes

### **Public Routes**

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `App.jsx` | Home page with hero, products, categories |
| `/about-us` | `AboutUsPage.jsx` | About HiMart |
| `/muslim-mart` | `MuslimMartPage.jsx` | Halal products section |
| `/products` | `ProductsPage.jsx` | Product catalog with filters |
| `/products/:id` | `ViewProductPage.jsx` | Product detail page |
| `/cart` | `CartPage.jsx` | Shopping cart |
| `/cart/checkout` | `CheckoutPage.jsx` | Checkout flow |
| `/auth/signin` | `SignInPage.jsx` | User login |
| `/auth/signup` | `SignUpPage.jsx` | User registration |
| `/become-seller` | `BecomeSellerPage.jsx` | Seller registration |

### **Protected Routes** (Require Authentication)

| Route | Component | Access |
|-------|-----------|--------|
| `/profile` | `ProfilePage.jsx` | Authenticated users |
| `/auth/logout` | `LogoutPage.jsx` | Authenticated users |
| `/seller/dashboard` | `SellerDashboardPage.jsx` | Sellers only |
| `/seller/add-product` | `AddProductPage.jsx` | Sellers only |

### **Fallback Routes**

| Route | Component | Description |
|-------|-----------|-------------|
| `/unauthorized` | `UnauthorizedPage.jsx` | 401 Unauthorized |
| `*` | `NotFoundPage.jsx` | 404 Not Found |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Backend Server** running (see hi-mart-backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/shawkath646/hi-mart-frontend.git
cd hi-mart-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build & Preview

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000

# Optional: Override default ports
VITE_PORT=5173
```

### Configuration Notes

- `VITE_BACKEND_URL` - Backend API endpoint (defaults to `http://localhost:5000`)
- All environment variables must be prefixed with `VITE_` to be accessible in the app
- Update `VITE_BACKEND_URL` for production deployment

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

### Deploy to Other Platforms

The project can be deployed to any static hosting platform:

- **GitHub Pages** - Static hosting for GitHub repos
- **Cloudflare Pages** - Fast global CDN
- **AWS S3 + CloudFront** - Scalable cloud hosting
- **Firebase Hosting** - Google's hosting platform

**Build Command**: `npm run build`  
**Output Directory**: `dist`

---

## 👨‍💻 Author

**Shawkat Hossain Maruf**

- 🌐 Website: [shawkath646.pro](https://shawkath646.pro)
- 💼 LinkedIn: [linkedin.com/in/shawkath645](https://linkedin.com/in/shawkath645)
- 📧 Email: <shawkath646@gmail.com>
- 🐙 GitHub: [@shawkath646](https://github.com/shawkath646)

**About Me**: Full-stack developer and Computer Science student at Sejong University, specializing in React, Next.js, TypeScript, and modern web technologies. Passionate about creating beautiful, performant, and accessible web applications.


## 🏢 Powered By

<div align="center">

<img src="https://cloudburstlab.vercel.app/api/branding/logo?variant=transparent" alt="Cloudburst Lab" width="200" />


**Cloudburst Lab** is a digital innovation studio focused on creating exceptional web and mobile applications. We specialize in modern JavaScript frameworks, cloud technologies, and user-centric design principles.

</div>
<br />

## 📄 License

This project is **proprietary** and © 2024-2025 Shawkat Hossain Maruf. All rights reserved.

The source code is available for viewing and learning purposes. For commercial use, collaboration, or inquiries, please contact the author.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing library
- **Vite Team** - For the blazing-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Open Source Community** - For incredible tools and libraries

---

## 📊 Project Stats

![React](https://img.shields.io/badge/Framework-React_19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Build_Tool-Vite_6-646CFF?style=flat-square&logo=vite)
![Code Quality](https://img.shields.io/badge/Code_Quality-A+-success?style=flat-square)
![Performance](https://img.shields.io/badge/Performance-95%2B-brightgreen?style=flat-square)
![Accessibility](https://img.shields.io/badge/Accessibility-95%2B-brightgreen?style=flat-square)

---

<div align="center">
### ⭐ Star this repository if you find it helpful
</div>
