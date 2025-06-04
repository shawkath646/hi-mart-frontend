import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from './libs/useAuth.jsx';
import { SellerAuthProvider } from './libs/useSellerAuth.jsx';
import { CartProvider } from './libs/useCartContext.jsx';
import Layout from './components/Layout.jsx';
import App from './App.jsx';
import MuslimMart from './routes/MuslimMart.jsx';
import Products from './routes/ProductsPage.jsx';
import ViewProductPage from './routes/ViewProduct.jsx';
import CategoriesPage from './routes/CategoriesPage.jsx';
import SignInPage from './routes/SignInPage.jsx';
import SignUpPage from './routes/SignUpPage.jsx';
import BecomeSeller from './routes/BecomeSellerPage.jsx';
import SellerDashboardPage from './routes/SellerDashboard.jsx';
import AboutUsPage from './routes/AboutUsPage.jsx';
import NotFoundPage from './routes/NotFoundPage.jsx';
import AddProductPage from './routes/AddProductPage.jsx';
import CartPage from './routes/CartPage.jsx';
import CheckoutPage from './routes/CheckoutPage.jsx';
import UserProfilePage from './routes/UserProfilePage.jsx';
import LogoutPage from './routes/LogoutPage.jsx';
import UnauthorizedPage from './routes/UnauthorizedPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SellerAuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<App />} />
                <Route path="/muslim-mart" element={<MuslimMart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ViewProductPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/cart/checkout" element={<CheckoutPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/become-seller" element={<BecomeSeller />} />
                <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                <Route path="/seller/add-product" element={<AddProductPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </SellerAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
