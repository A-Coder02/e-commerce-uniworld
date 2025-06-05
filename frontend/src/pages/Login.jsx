import React from "react";
// Components
import { Formik, Form } from "formik";
import TextField from "../components/form-ui/TextField";
import Button from "../components/form-ui/Button";
import { Link, useNavigate } from "react-router-dom";
// others
import * as Yup from "yup";
import AuthService from "../services/Auth.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "../store/auth.slice";

const Login = () => {
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
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await AuthService.login(values);
      if (response.status === true) {
        // todo: store tokens
        // todo: store user data
        navigate("/");
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
    <div className="flex justify-center items-center min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 px-4 py-6 bg-white md:shadow-lg min-w-full md:min-w-sm">
            <h2 className="text-xl font-semibold text-gray-700">Login</h2>
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
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Login
            </Button>
            <p className="text-center mt-6">
              No Account?
              <Link to={"/register"} className="underline text-blue-500">
                Create Account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
