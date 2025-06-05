import { useEffect, useMemo, useState } from "react";
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

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const isRegularRoute = useMemo(() =>
    ["/", "/products", "/category", "/about-us"].some(route => pathname.startsWith(route)),
    [pathname]
  );

  const isSellerRoute = useMemo(() => pathname.startsWith("/seller"), [pathname]);
  const isAuthRoute = useMemo(() => pathname.startsWith("/auth"), [pathname]);
  const showFooter = useMemo(() => !isAuthRoute && (isRegularRoute || isSellerRoute), [isAuthRoute, isRegularRoute, isSellerRoute]);

  // Ping backend on mount
  useEffect(() => {
    const pingBackend = async () => {
      try {
        await axios.get(BACKEND_URL);
        setBackendDown(false);
      } catch (err) {
        console.error("Backend connection failed:", err.message);
        setBackendDown(true);
      }
    };
    pingBackend();
  }, [BACKEND_URL]);

  // Route protection logic
  useEffect(() => {
    if (loading || backendDown) return;

    const protectedRoutes = ["/profile", "/auth/logout"];
    const sellerOnlyRoutes = ["/seller"];

    const isProtectedRoute =
      protectedRoutes.includes(pathname) ||
      sellerOnlyRoutes.some(route => pathname.startsWith(route));

    const requiresSeller =
      sellerOnlyRoutes.some(route => pathname.startsWith(route));

    const userNotAllowed =
      !session || (requiresSeller && !session.user?.isSeller);

    if (isProtectedRoute && userNotAllowed) {
      navigate("/unauthorized", { replace: true });
    }
  }, [pathname, session, loading, backendDown, navigate]);

  if (backendDown) return <ConnectionErrorPage />;
  if (loading) return <LoadingPage />;

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
