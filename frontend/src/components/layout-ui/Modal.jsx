import React from "react";
import { createPortal } from "react-dom";

/**
 * A reusable modal dialog component that renders outside the DOM hierarchy using portals.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls the visibility of the modal
 * @param {Function} props.setShow - Callback to update the show state
 * @param {string} [props.title] - Optional title for the modal
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal
 * @param {boolean} [props.loading=false] - Disables closing when in loading state
 * @returns {React.ReactPortal|null} A portal to the modal content or null if not shown
 */
const Modal = ({ show, setShow, title, children, loading = false }) => {
  // Return null if modal shouldn't be shown
  if (!show) return null;

  // Modal JSX structure
  const modal = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 z-50"
      // Optional: Add click outside to close functionality
      onClick={() => !loading && setShow(false)}
    >
      <div
        className="bg-white px-4 py-3 shadow-md w-[90%] md:w-96 relative"
        // Prevent click propagation to avoid closing when clicking inside modal
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-row justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {/* Close button */}
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer ml-auto focus:outline-none"
            onClick={() => !loading && setShow(false)}
            disabled={loading}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              {/* Loading spinner or placeholder */}
              <span>Loading...</span>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );

  // Create a portal to render the modal outside the current DOM hierarchy
  return createPortal(modal, document.body);
};

export default Modal;
