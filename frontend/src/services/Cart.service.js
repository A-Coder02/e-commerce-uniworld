import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { productsUrl } from "../utils/urls";

const post = async (items, order_id) => {
  try {
    const response = await axiosInstance.post(productsUrl + "/checkout", {
      items,
      order_id,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const createOrder = async (total) => {
  try {
    const response = await axiosInstance.post(productsUrl + "/create-order", {
      total,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const CartService = {
  post,
  createOrder,
};

export default CartService;
