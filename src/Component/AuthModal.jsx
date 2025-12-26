import React, { useState } from "react";
import Picture from "../assets/modal image.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AuthModal = ({ show, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [resetLoading, setResetLoading] = useState(false);
  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error("Passwords do not match");
      setResetLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/resetpassword`,
        resetData
      );

      toast.success(res.data?.message || "Password changed successfully");

      setResetData({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });

      document.getElementById("resetPassword")?.classList.remove("show");
      document.getElementById("authMain")?.classList.add("show");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setResetLoading(false);
    }
  };
  const resetInitialValues = {
  email: "",
  otp: "",
  newPassword: "",
  confirmPassword: "",
};

const resetValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  otp: Yup.string()
    .required("OTP is required"),

  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const registerInitialValues = {
    name: "",
    email: "",
    contact: "",
    address: "",
    pincode: "",
    password: "",
  };
  const registerValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
  });

  const handleRegisterSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        name: values.name,
        email: values.email,
        contact_number: values.contact,
        address: values.address,
        pincode: values.pincode,
        role: "customer",
        password: values.password,
      });

      toast.success("Registration Successful");

      setActiveTab("login");

      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      localStorage.setItem("token", loginRes.data.result.token);
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      setStatus(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        loginData
      );
      //  console.log("resultt<><><><><",res.data);

      localStorage.setItem("token", res.data.result.token);
      toast.success("Login Successful");

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <button
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={onClose}
              ></button>
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
                  <img
                    src={Picture}
                    alt="Image Not found"
                    className="img-fluid h-100 object-fit-cover"
                  />
                </div>

                <div className="col-12 col-lg-6 p-4 p-md-5">
                  <div className="collapse show" id="authMain">
                    <ul className="nav nav-tabs mb-4">
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`nav-link ${
                            activeTab === "login" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("login")}
                        >
                          Login
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`nav-link ${
                            activeTab === "register" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("register")}
                        >
                          Register
                        </button>
                      </li>
                    </ul>

                    {activeTab === "login" && (
                      <form onSubmit={handleLoginSubmit}>
                        <div className="mb-3 input-group">
                          <span className="input-group-text">@</span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>

                        <div className="mb-3 input-group">
                          <span className="input-group-text">🔒</span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>

                        <div className="d-flex justify-content-end mb-3">
                          <span
                            className=" fw-bold"
                            data-bs-toggle="collapse"
                            data-bs-target="#forgotPassword"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              document
                                .getElementById("authMain")
                                ?.classList.remove("show");
                            }}
                          >
                            Forgot Password?
                          </span>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-dark w-100"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </form>
                    )}

                    {activeTab === "register" && (
                      <Formik
                        initialValues={registerInitialValues}
                        validationSchema={registerValidationSchema}
                        onSubmit={handleRegisterSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="mb-3">
                              <Field
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                              />
                              <ErrorMessage
                                name="email"
                                component="small"
                                className="text-danger"
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                name="name"
                                className="form-control"
                                placeholder="Name"
                              />
                              <ErrorMessage
                                name="name"
                                component="small"
                                className="text-danger"
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                name="contact"
                                className="form-control"
                                placeholder="Contact Number"
                                maxLength="10"
                              />
                              <ErrorMessage
                                name="contact"
                                component="small"
                                className="text-danger"
                              />
                            </div>

                            <div className="row">
                              <div className="col-12 col-md-6 mb-3">
                                <Field
                                  name="address"
                                  className="form-control"
                                  placeholder="Address"
                                />
                                <ErrorMessage
                                  name="address"
                                  component="small"
                                  className="text-danger"
                                />
                              </div>

                              <div className="col-12 col-md-6 mb-3">
                                <Field
                                  name="pincode"
                                  className="form-control"
                                  placeholder="Pincode"
                                />
                                <ErrorMessage
                                  name="pincode"
                                  component="small"
                                  className="text-danger"
                                />
                              </div>
                            </div>

                            <div className="mb-3">
                              <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                              />
                              <ErrorMessage
                                name="password"
                                component="small"
                                className="text-danger"
                              />
                            </div>

                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                required
                              />
                              <label className="form-check-label">
                                I agree to Terms & Privacy Policy
                              </label>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-dark w-100"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Registering..." : "Register"}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </div>

                  <div className="collapse" id="forgotPassword">
                    <form
                      className="mt-2"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setForgotLoading(true);

                        try {
                          const res = await axios.post(
                            `${import.meta.env.VITE_API_URL}/user/forget`,
                            { email: forgotEmail }
                          );

                          toast.success(
                            res.data?.message || "OTP sent to your email"
                          );

                          document
                            .getElementById("forgotPassword")
                            ?.classList.remove("show");
                          document
                            .getElementById("resetPassword")
                            ?.classList.add("show");

                          setForgotEmail("");
                        } catch (error) {
                          toast.error(
                            error.response?.data?.message ||
                              "Something went wrong!"
                          );
                        } finally {
                          setForgotLoading(false);
                        }
                      }}
                    >
                      <h5 className="fw-bold mb-3">Forgot Password</h5>

                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Registered Email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={forgotLoading}
                      >
                        {forgotLoading ? "Sending OTP..." : "Send OTP"}
                      </button>

                      <div className="text-center mt-3">
                        <span
                          className="text-primary fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            document
                              .getElementById("forgotPassword")
                              ?.classList.remove("show");
                            document
                              .getElementById("authMain")
                              ?.classList.add("show");
                          }}
                        >
                          Back to Login
                        </span>
                      </div>
                    </form>
                  </div>

               
                  <div className="collapse" id="resetPassword">
  <Formik
    initialValues={resetInitialValues}
    validationSchema={resetValidationSchema}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/resetpassword`,
          values
        );

        toast.success(
          res.data?.message || "Password changed successfully"
        );

        resetForm();

        
        document.getElementById("resetPassword")?.classList.remove("show");
        document.getElementById("authMain")?.classList.add("show");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Password reset failed"
        );
      } finally {
        setSubmitting(false);
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form className="mt-2">
        <h5 className="fw-bold mb-3">Reset Password</h5>

     
        <div className="mb-3">
          <Field
            type="email"
            name="email"
            className="form-control"
            placeholder="Registered Email"
          />
          <ErrorMessage
            name="email"
            component="small"
            className="text-danger"
          />
        </div>

   
        <div className="mb-3">
          <Field
            type="text"
            name="otp"
            className="form-control"
            placeholder="OTP"
          />
          <ErrorMessage
            name="otp"
            component="small"
            className="text-danger"
          />
        </div>

  
        <div className="mb-3">
          <Field
            type="password"
            name="newPassword"
            className="form-control"
            placeholder="New Password"
          />
          <ErrorMessage
            name="newPassword"
            component="small"
            className="text-danger"
          />
        </div>

    
        <div className="mb-3">
          <Field
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
          />
          <ErrorMessage
            name="confirmPassword"
            component="small"
            className="text-danger"
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>

        <div className="text-center mt-3">
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => {
              document.getElementById("resetPassword")?.classList.remove("show");
              document.getElementById("forgotPassword")?.classList.add("show");
            }}
          >
            Back
          </span>
        </div>
      </Form>
    )}
  </Formik>
</div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default AuthModal;
