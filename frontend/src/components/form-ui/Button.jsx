import React from "react";

/**
 * A customizable button component with support for variants, loading state, and size.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.type="button"] - The button type (e.g., "button", "submit", "reset").
 * @param {string} [props.variant="contained"] - The button variant, either "contained" or "outlined".
 * @param {string} [props.size="md"] - The button size, either "md" (medium) or "sm" (small).
 * @param {boolean} [props.isLoading=false] - Whether the button shows a loading state.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {function} [props.onClick] - The click event handler function.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({
  type = "button",
  variant = "contained",
  size = "md",
  isLoading = false,
  disabled = false,
  children,
  onClick,
}) => {
  // Styling based on variant
  const baseClasses = "transition cursor-pointer h-fit ";
  const containedClasses = "bg-blue-500 text-white hover:bg-blue-600";
  const outlinedClasses =
    "border border-blue-500 text-blue-500 hover:bg-blue-50";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  const sizeClasses =
    size === "sm" ? "py-1 px-2 text-sm" : "py-2 px-4 text-base";

  // Choose styles based on variant, size, and disabled state
  const classes = `${baseClasses} ${sizeClasses} ${
    variant === "contained" ? containedClasses : outlinedClasses
  } ${disabled || isLoading ? disabledClasses : ""}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
