import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./features/components/Home/Home";
import Navbar from "./features/components/Navbar/Navbar";
import ProductDetails from "./features/components/Products/ProductDetails";
import Login from "./features/auth/Login/Login";
import Register from "./features/auth/Register/Register";
import Footer from "./features/components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProtectedRoute from "./features/components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
function App() {
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    });
  }, []);
  const hideComponents =
    location.pathname.startsWith("/login") || location.pathname.startsWith("/register");
  return (
    <>
      {!hideComponents && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product-details/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        {/* auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideComponents && <Footer />}
      <ToastContainer autoClose={2000}/>
    </>
  );
}

export default App;