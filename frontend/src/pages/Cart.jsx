import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} from "../store/cart.slice";
import Button from "../components/form-ui/Button";
import CartService from "../services/Cart.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // Handlers for quantity
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const checkoutHandler = () => {
    setLoading(true);

    CartService.createOrder(totalAmount)
      .then((res) => {
        // get order id
        CartService.post(items, res.data.id)
          .then(() => {
            navigate("/");
            dispatch(clearCart());
            toast.success("Order Created! Will recive mail");
            // show toast, check mail recived detials tehre will contact soon
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="grid grid-cols-12 gap-8">
        {/* Items list (8 cols) */}
        <section className="col-span-12 md:col-span-8 space-y-6">
          {items.length === 0 && (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
          {items.map(({ id, name, price, quantity, image }) => (
            <div
              key={id}
              className="flex items-center gap-4 border border-gray-200 rounded-lg p-4"
            >
              <img
                src={image}
                alt={name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{name}</h2>
                <p className="text-gray-600">Price: ₹{price}</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleDecrease(id, quantity)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrease(id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(id))}
                    className="px-3 py-1 bg-gray-400 text-black rounded hover:bg-gray-500 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="font-semibold text-lg">₹{price * quantity}</div>
            </div>
          ))}
        </section>

        {/* Summary (4 cols) */}
        <aside className="col-span-12 md:col-span-4 bg-gray-100 p-6 rounded-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Summary</h2>
          <div className="flex justify-between text-lg font-medium">
            <span>Subtotal:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t border-gray-300 pt-4">
            <span>Total:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <Button
            size="lg"
            onClick={() => checkoutHandler()}
            className="w-full"
            disabled={loading}
          >
            Proceed to Checkout
          </Button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
