import React from "react";
// Components
import TextField from "../components/form-ui/TextField";
import Button from "../components/form-ui/Button";
import Select from "../components/form-ui/Select";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
// others
import * as Yup from "yup";
import AuthService from "../services/Auth.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "../store/auth.slice";

const Register = () => {
  // States & Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["admin", "user"], "Select a valid role")
      .required("Role is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    role: "",
  };

  // Form submission handler
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await AuthService.register(values);
      if (response.status === true) {
        navigate("/");
        toast.success("Welcome!");

        dispatch(setUser(response.data));
        dispatch(setTokens(response.tokens));
      } else {
        toast.error(response?.data?.error);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-amber-50 flex justify-center items-center min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 px-4 py-6 bg-white md:shadow-lg min-w-full md:min-w-sm">
            <h2 className="text-xl font-semibold text-gray-700">Register</h2>
            <TextField
              name="email"
              label="Email"
              placeholder={"johndoe@mail.com"}
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder={"***"}
            />
            <Select
              label="Role"
              name="role"
              options={[
                { value: "", label: "Select role" },
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Register
            </Button>
            <p className="text-center mt-6">
              Have an Account?
              <Link to={"/login"} className="underline text-blue-500">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
