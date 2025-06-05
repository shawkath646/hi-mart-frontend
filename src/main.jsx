import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

// Providers
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { AuthProvider } from './contexts/useAuth.jsx';
import { SellerAuthProvider } from './contexts/useSellerAuth.jsx';
import { CartProvider } from './contexts/useCart.jsx';

// Global Layout
import Layout from './Layout.jsx';

// Pages - Main
import App from './App.jsx';
import AboutUsPage from './routes/about-us/AboutUsPage.jsx';

// Pages - Auth
import SignInPage from './routes/auth/signin/SignInPage.jsx';
import SignUpPage from './routes/auth/signup/SignUpPage.jsx';
import LogoutPage from './routes/auth/logout/LogoutPage.jsx';

// Pages - Fallbacks
import NotFoundPage from './routes/fallbacks/NotFoundPage.jsx';
import UnauthorizedPage from './routes/fallbacks/UnauthorizedPage.jsx';

// Pages - Cart
import CartPage from './routes/cart/CartPage.jsx';
import CheckoutPage from './routes/cart/checkout/CheckoutPage.jsx';

// Pages - Product-related
import ProductsPage from './routes/products/ProductsPage.jsx';
import ViewProductPage from './routes/products/[id]/ViewProduct.jsx';

// Pages - Seller
import BecomeSellerPage from './routes/become-seller/BecomeSellerPage.jsx';
import SellerDashboardPage from './routes/seller/dashboard/SellerDashboardPage.jsx';
import AddProductPage from './routes/seller/dashboard/add-product/AddProductPage.jsx';

// Pages - Misc
import MuslimMartPage from './routes/muslim-mart/MuslimMartPage.jsx';
import ProfilePage from './routes/profile/ProfilePage.jsx';

// Styles
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <SellerAuthProvider>
            <CartProvider>
              <Routes>
                <Route element={<Layout />}>
                  {/* Main */}
                  <Route index element={<App />} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/muslim-mart" element={<MuslimMartPage />} />

                  {/* Products */}
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ViewProductPage />} />

                  {/* Cart */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/cart/checkout" element={<CheckoutPage />} />

                  {/* Auth */}
                  <Route path="/auth/signin" element={<SignInPage />} />
                  <Route path="/auth/signup" element={<SignUpPage />} />
                  <Route path="/auth/logout" element={<LogoutPage />} />

                  {/* User */}
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Seller */}
                  <Route path="/become-seller" element={<BecomeSellerPage />} />
                  <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                  <Route path="/seller/add-product" element={<AddProductPage />} />

                  {/* Fallback */}
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </SellerAuthProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
