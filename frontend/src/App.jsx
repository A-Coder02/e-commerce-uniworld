import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LayoutWrapper from "./LayoutWrapper";
import { ToastContainer } from "react-toastify";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portal from "./pages/Portal";
import store from "./store";
import { Provider } from "react-redux";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <Provider store={store}>
      <div className="h-screen overflow-auto">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Private Routes */}
            <Route path="/" element={<LayoutWrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </Provider>
  );
};

export default App;
