import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "./form-ui/TextField";
import Modal from "./layout-ui/Modal";
import Button from "./form-ui/Button";

/**
 * Validation schema for product form using Yup
 * @constant {Yup.ObjectSchema}
 */
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
});

/**
 * A reusable product form modal component with validation and submission handling.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls modal visibility
 * @param {Function} props.setShow - Callback to update visibility state
 * @param {string} props.title - Modal title
 * @param {Object} props.initialValues - Initial form values (determines create/update mode)
 * @param {Function} props.onSubmit - Form submission handler
 * @param {boolean} [props.loading=false] - Loading state for form submission
 * @returns {React.ReactElement} A modal containing a product form
 */
const ProductModal = ({
  show,
  setShow,
  title,
  initialValues,
  onSubmit,
  loading = false,
}) => {
  // Determine if we're in update mode by checking for existing ID
  const isUpdate = Boolean(initialValues?.id);

  return (
    <Modal loading={loading} show={show} setShow={setShow} title={title}>
      <div className="p-4">
        <Formik
          enableReinitialize // Allows form to update when initialValues changes
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4">
                {/* Product Name Field */}
                <TextField
                  name="name"
                  label="Product Name"
                  placeholder="e.g. iPhone 16"
                  disabled={loading}
                />

                {/* Price Field */}
                <TextField
                  name="price"
                  label="Price (Rs.)"
                  placeholder="e.g. 999"
                  type="number"
                  disabled={loading}
                />

                {/* Image URL Field */}
                <TextField
                  name="image"
                  label="Image URL"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  disabled={loading}
                />

                {/* Description Field */}
                <TextField
                  name="description"
                  label="Description"
                  placeholder="Product details..."
                  as="textarea" // Assuming TextField supports textarea via 'as' prop
                  rows={3}
                  disabled={loading}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !isValid || !dirty}
                  isLoading={loading}
                  className="mt-4 w-full"
                >
                  {isUpdate ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ProductModal;
