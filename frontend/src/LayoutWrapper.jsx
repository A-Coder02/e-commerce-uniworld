import React, { useEffect } from "react";
import Header from "./components/layout-ui/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setTokens, setUser } from "./store/auth.slice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const LayoutWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const user = auth?.user?.[0] || auth?.user || {};

  useEffect(() => {
    // To store tokens in store
    // if its not exists redirect to login screen
    const initAuth = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        dispatch(setTokens({ accessToken }));
        const decoded = jwtDecode(accessToken);
        dispatch(setUser(decoded));
      } else {
        dispatch(clearAuth());
        navigate("/login");
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    // this allows only admin role based users only
    const checkUserIsAdminOrNot = () => {
      if (user && user?.role && location.pathname === "/portal") {
        if (user.role !== "admin") {
          toast.warn(
            "Not Permissible to access portal via User Account, Please use Admin Account"
          );
          navigate("/login");
        }
      }
    };
    checkUserIsAdminOrNot();
  }, [auth]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <Header />
      <main className="my-2 md:my-4 px-4 md:px-4 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWrapper;
