import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router";
import { useAuth } from "./contexts/useAuth";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import RegularNavbar from "./components/navigation/RegularNavbar";
import DashboardNavbar from "./components/navigation/DashboardNavbar";
import RegularFooter from "./components/navigation/RegularFooter";
import LoadingPage from "./routes/fallbacks/LoadingPage";
import ConnectionErrorPage from "./routes/fallbacks/ConnectionErrorPage";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  const [backendDown, setBackendDown] = useState(false);

  const regularRoute = ["/", "/products", "/category", "/about-us"];
  const isRegularRoute = regularRoute.some((route) =>
    pathname.startsWith(route)
  );
  const isSellerRoute = pathname.startsWith("/seller");
  const isAuthRoute = pathname.startsWith("/auth");
  const showFooter = !isAuthRoute && (isRegularRoute || isSellerRoute);

  // Ping backend once on mount
  useEffect(() => {
    const pingBackend = async () => {
      try {
        await axios.get(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");
        setBackendDown(false);
      } catch (err) {
        console.error("Backend connection failed:", err.message);
        setBackendDown(true);
      }
    };

    pingBackend();
  }, []);

  // Protected route logic
  useEffect(() => {
    if (loading || backendDown) return;

    const protectedRoutes = ["/profile", "/auth/logout"];
    const sellerOnlyRoutes = ["/seller"];

    const isProtected =
      protectedRoutes.includes(pathname) ||
      sellerOnlyRoutes.some((route) => pathname.startsWith(route));

    const needsSeller =
      sellerOnlyRoutes.some((route) => pathname.startsWith(route));

    const notAllowed =
      !session || (needsSeller && !session.user?.isSeller);

    if (isProtected && notAllowed) {
      navigate("/unauthorized", { replace: true });
    }
  }, [pathname, session, loading, backendDown, navigate]);

  if (backendDown) {
    return <ConnectionErrorPage />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {isRegularRoute && <RegularNavbar />}
      {isSellerRoute && <DashboardNavbar />}
      <Outlet />
      {showFooter && <RegularFooter />}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        pauseOnFocusLoss={false}
        stacked
        newestOnTop
      />
    </>
  );
}
