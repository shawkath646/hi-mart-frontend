import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router";
import { useAuth } from "../libs/useAuth";
import { ToastContainer } from "react-toastify";
import RegularNavbar from "./navigation/RegularNavbar";
import DashboardNavbar from "./navigation/DashboardNavbar";
import RegularFooter from "./navigation/RegularFooter";
import 'react-toastify/dist/ReactToastify.css';


export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  const regularRoute = ["/", "/products", "/category", "/about-us"];
  const isRegularRoute = regularRoute.some((route) =>
    pathname.startsWith(route)
  );

  const isSellerRoute = pathname.startsWith("/seller");
  const isAuthRoute = ["/signin", "/signup"].includes(pathname);

  const showFooter = !isAuthRoute && (isRegularRoute || isSellerRoute);

  // Protected route logic with loading check
  useEffect(() => {
    if (loading) return; // Wait for session to load

    const protectedRoutes = ["/profile", "/logout"];
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
  }, [pathname, session, loading, navigate]);

  return (
    <>
      {isRegularRoute && <RegularNavbar />}
      {isSellerRoute && <DashboardNavbar />}
      {loading ? (
        <div className="text-center mt-20 text-gray-500">Loading...</div>
      ) : (
        <>
          <Outlet />
          {showFooter && <RegularFooter />}
        </>
      )}
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
