import React from "react";
import { useField } from "formik";
import Label from "./Label";

/**
 * A Select component integrated with Formik for form handling.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the select field.
 * @param {string} props.name - The name of the select field.
 * @param {Array<{label: string, value: string}>} props.options - An array of option objects with label and value.
 * @returns {JSX.Element} The rendered select component with label and error message (if any).
 */
const Select = ({ label, name, options }) => {
  // Using useField to connect the select input with Formik
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label name={name}>{label}</Label>
        <select
          {...field} // Spread the field props (value, onChange, onBlur)
          id={name}
          className={`border px-3 py-2 w-full ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {meta.touched && meta.error && <Label error>{meta.error}</Label>}
    </div>
  );
};

export default Select;
