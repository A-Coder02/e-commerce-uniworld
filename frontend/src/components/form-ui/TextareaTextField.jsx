import { useField } from "formik";
import React from "react";
import Label from "./Label";

/**
 * A TextareaField component integrated with Formik for form handling.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the textarea field.
 * @param {string} props.name - The name of the textarea field.
 * @param {string} [props.placeholder] - Placeholder text for the textarea.
 * @returns {JSX.Element} The rendered textarea field with label and error message (if any).
 */
const TextareaField = ({ label, name, placeholder }) => {
  // Using useField to connect the textarea with Formik
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label name={name}>{label}</Label>
        <textarea
          {...field} // Spread the field props (value, onChange, onBlur)
          id={name}
          placeholder={placeholder}
          className={`border px-3 py-2 w-full resize-none h-24 ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {meta.touched && meta.error && <Label error>{meta.error}</Label>}
    </div>
  );
};

export default TextareaField;
