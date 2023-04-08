import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Auth = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [newUserDetails, setNewUserDetails] = useState({});
  const [loginStatus, setLoginStatus] = useState("");
  const [userLoginDetails, setUserLoginDetails] = useState({
    username: "",
    password: "",
  });

  const initialValue = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters long")
      .max(14, "Password can  not be more than 14 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords does not match"
    ),
  });

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      setNewUserDetails(data);
      await Axios.post(
        "http://localhost:4000/auth/register",
        newUserDetails
      ).then((res) => alert(res.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormInput = (event: any) => {
    setUserLoginDetails({
      ...userLoginDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      await Axios.post(
        "http://localhost:4000/auth/login",
        userLoginDetails
      ).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setCookies("access_token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          router.push("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen px-4 bg-slate-900 grid grid-cols-2 justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-3">Register</h1>
        <Formik
          initialValues={initialValue}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form className="w-80 h-auto p-3 flex flex-col border border-slate-600">
            <label className="w-auto my-2 inline-block">Username</label>
            <ErrorMessage
              name="username"
              component="h3"
              className="mt-0 text-sm text-red-700"
            />
            <Field
              type="text"
              name="username"
              className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
            />
            <label className="w-auto my-2 inline-block">Password</label>
            <ErrorMessage
              name="password"
              component="h3"
              className="mt-0 text-sm text-red-700"
            />
            <Field
              type="password"
              name="password"
              className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
            />
            <label className="w-auto my-2 inline-block">Confirm Password</label>
            <ErrorMessage
              name="confirmPassword"
              component="h3"
              className="mt-0 text-sm text-red-700"
            />
            <Field
              type="password"
              name="confirmPassword"
              className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
            />
            <button
              type="submit"
              className="bg-slate-800 w-auto h-auto mt-3 mx-auto px-3 py-1 rounded-md border border-slate-700"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
      <form method="POST" className="flex flex-col items-center">
        <h1 className="text-2xl mb-3">Login</h1>
        <div className="w-80 h-auto p-3 flex flex-col place-self-center border border-slate-600">
          {loginStatus && (
            <h4 className="mt-0 text-sm text-center text-red-700">
              {loginStatus}
            </h4>
          )}
          <label className="w-auto my-2 inline-block">Username</label>
          <input
            type="text"
            name="username"
            value={userLoginDetails.username}
            onChange={handleFormInput}
            className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
          />
          <label className="w-auto my-2 inline-block">Password</label>
          <input
            type="password"
            name="password"
            value={userLoginDetails.password}
            onChange={handleFormInput}
            className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="bg-slate-800 w-auto h-auto mt-3 mx-auto px-3 py-1 rounded-md border border-slate-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
