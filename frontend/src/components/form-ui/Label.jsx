import React from "react";

/**
 * A label component that displays text with optional error styling.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The associated input name for the label.
 * @param {React.ReactNode} props.children - The content of the label.
 * @param {boolean} [props.error=false] - Whether the label should display an error style.
 * @returns {JSX.Element} The rendered label component.
 */
const Label = ({ name, children, error = false }) => {
  const _className = error ? "text-red-500" : "text-slate-800";
  return (
    <label htmlFor={name} className={`${_className} text-sm`}>
      {children}
    </label>
  );
};

export default Label;
