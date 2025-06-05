import { useField } from "formik";
import React from "react";
import Label from "./Label";

/**
 * A reusable text input field component integrated with Formik.
 * Supports various input types (text, email, password, etc.) with validation and error handling.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - The label text for the input field
 * @param {string} props.name - The name of the field (must match Formik field name)
 * @param {string} [props.placeholder] - Optional placeholder text for the input
 * @param {string} [props.type="text"] - Input type (text, email, password, etc.)
 * @returns {React.ReactElement} A text input field with label and error handling
 */
const TextField = ({ label, name, placeholder, type = "text" }) => {
  // useField hook connects this input to Formik's form state management
  // field contains: value, onChange, onBlur, and other necessary props
  // meta contains: error, touched, and other metadata about the field state
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {/* Label component associated with the input */}
        <Label name={name}>{label}</Label>

        {/* The input element with Formik integration */}
        <input
          {...field} // Spread all Formik field props (value, onChange, onBlur, etc.)
          id={name}
          placeholder={placeholder}
          type={type} // Dynamic input type (text, email, password, etc.)
          // Dynamic className that shows red border when there's an error
          className={`border px-3 py-2 w-full ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      {/* Display error message if the field has been touched and has an error */}
      {meta.touched && meta.error && <Label error>{meta.error}</Label>}
    </div>
  );
};

export default TextField;
