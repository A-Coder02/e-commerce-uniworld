import React, { useState } from "react";
import Button from "../form-ui/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { clearAuth } from "../../store/auth.slice";
import { useLocation, useNavigate } from "react-router-dom";

// Simple cart SVG icon (outline)
const CartIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0h13.2M5.4 21a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0zM17 21a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0z"
    />
  </svg>
);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity || 0);

  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = auth?.user?.[0] || auth?.user || {};
  const isAdmin = user?.role === "admin";

  const logoutHandler = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <header className="flex gap-4 items-center sticky top-0 z-50 py-2 px-4 bg-white border-b border-b-slate-400 pb-3">
      <div
        className="font-medium md:text-2xl mr-auto cursor-pointer"
        onClick={() => navigate("/")}
      >
        Uniworld
      </div>

      <div className="text-slate-800 hidden md:block">
        Hi <span className="font-medium">{user.email}!</span>
      </div>

      {/* Cart icon with tooltip */}
      <div
        className="relative cursor-pointer text-gray-700 hover:text-gray-900 hidden md:flex items-center"
        onClick={() => navigate("/cart")}
        aria-label={`Cart with ${cartQuantity} item${
          cartQuantity !== 1 ? "s" : ""
        }`}
      >
        <CartIcon className="w-6 h-6" />
        {cartQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-semibold">
            {cartQuantity}
          </span>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          {cartQuantity} item{cartQuantity !== 1 ? "s" : ""}
        </div>
      </div>

      {isAdmin && (
        <Button size="sm" onClick={() => navigate("/portal")}>
          Go to Portal
        </Button>
      )}

   

      <div className="hidden md:block">
        {location.pathname === "/portal" && (
          <Button size="sm" onClick={() => navigate("/")}>
            Home
          </Button>
        )}
      </div>

      <Button size="sm" onClick={() => setShow(true)} variant="outlined">
        Logout
      </Button>

      <Modal show={show} setShow={setShow} title="Oh! Sure?">
        <div className="flex flex-col items-end">
          <p className="w-full text-left mb-8">You want log out?</p>
          <Button onClick={logoutHandler}>Damn, Sure!</Button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
