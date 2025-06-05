import axios from "axios";
import { loginUrl, registerUrl } from "../utils/urls";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const login = async (body) => {
  return axiosInstance
    .post(loginUrl, body)
    .then((res) => res.data)
    .catch((error) => {
      toast.error(
        error.message || error.response.message || "Something went wrong"
      );
      return error.response;
    });
};

const register = async (body) => {
  return axiosInstance
    .post(registerUrl, body)
    .then((res) => res.data)
    .catch((error) => {
      toast.error(
        error.message || error.response.message || "Something went wrong"
      );
      return error.response;
    });
};

export default {
  login,
  register,
};
