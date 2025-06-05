import React, { useState } from "react";
import Modal from "./layout-ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../store/cart.slice"; // adjust path if needed

const Card = ({ id, price, name, image, description }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // Find item in cart by id
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === id)
  );

  const openModalHandler = () => setShow(true);

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, image }));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = () => {
    if (cartItem?.quantity === 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  return (
    <>
      <article className="group flex flex-col gap-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-semibold text-lg text-gray-800">{name}</p>
          <p className="text-gray-600 text-sm">₹{price}</p>

          <div className="flex gap-3 mt-2 items-center">
            <button
              onClick={openModalHandler}
              className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </button>

            {/* If item exists in cart, show quantity controls, else show add to cart */}
            {cartItem ? (
              <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-1">
                <button
                  onClick={handleDecrease}
                  className="px-3 py-0.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-semibold text-green-800">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="px-3 py-0.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </article>

      <Modal show={show} setShow={setShow} title={`Product #${id || 0}`}>
        <div className="flex flex-col gap-4 text-gray-800">
          <div>
            <p className="text-2xl font-bold">{name}</p>
            <p className="text-lg text-gray-600 mt-1">₹{price}</p>
          </div>

          <img
            src={image}
            alt={name}
            className="w-full rounded-lg bg-gray-100 aspect-video object-contain"
          />

          <p className="text-sm leading-relaxed">{description}</p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShow(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-400 transition"
            >
              Close
            </button>

            {/* Add to Cart button inside modal */}
            {cartItem ? (
              <div className="flex items-center gap-2 bg-green-100 rounded-lg px-3 py-1">
                <button
                  onClick={handleDecrease}
                  className="px-3 py-0.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-semibold text-green-800">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="px-3 py-0.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
