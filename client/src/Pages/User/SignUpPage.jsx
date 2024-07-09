/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  doingVerificationStart,
} from "../../Redux/Actions/authActions.jsx";

import { ValidationSchema } from "../../Components/All/Validation.jsx";

import { BiShow, BiHide } from "react-icons/bi";

import { IoPersonSharp } from "react-icons/io5";

import { RiLockPasswordFill } from "react-icons/ri";

import { MdMarkEmailUnread } from "react-icons/md";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SignUpPage() {
  /* */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState("");

  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    terms: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  const change = (event) => {
    /* */

    if (
      event.target.type === "text" ||
      event.target.type === "email" ||
      event.target.type === "password" ||
      event.target.type === "number"
    ) {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    if (event.target.type === "radio") {
      setInputs({ ...Inputs, [event.target.name]: event.target.value });
    }

    /* */
  };

  const handleRegistration = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      dispatch(signInStart());

      await ValidationSchema.validate(Inputs, { abortEarly: false });

      setLoading(true);

      const res = await fetch(`${SERVER_URL}/api/auth/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        dispatch(signInFailure(data.message));

        toast.error(data.message);

        setLoading(false);

        return;

        /* */
      }

      dispatch(signInSuccess(data));

      dispatch(doingVerificationStart(data));

      window.localStorage.setItem("registerUserId", data._id);

      window.localStorage.setItem("email", data.email);

      navigate(`/verification/${"Registered but not verified"}/${401}`);

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      const newError = {};

      error.inner.forEach((error) => {
        newError[error.path] = error.message;
      });

      setErrors(newError);

      dispatch(signInFailure(error.message));

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <PageNavigation title="Register" />

      <Layout title={"Registration-Page"}>
        {/* */}

        <div className="bg-image2 pt-5 pb-5 mb-[40px] justify-center mx-auto bg-fixed">
          <div
            className="p-3 max-w-2xl mx-auto rounded-lg bg-indigo-400 pt-4 pb-5 mt-5 
            responsive-form-portion"
          >
            {/* */}

            {/*********************************************** */}
            {/* Creating a heading for the Registration form. */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 mb-5 text-blue-950">
              Registration Form
            </h1>

            {/*************************************************************** */}
            {/* Creating a form to get the user details from the signUp page. */}

            <form className="flex flex-col gap-4" onSubmit={handleRegistration}>
              {/* */}

              {/* ************************************** */}
              {/* Creating an input field for firstName. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Your First Name"
                  autoComplete="off"
                  autoFocus="on"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  onChange={change}
                  value={Inputs.firstName}
                />

                {/* */}
              </div>

              {errors.firstName && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.firstName}
                </div>
              )}

              {/* ************************************* */}
              {/* Creating an input field for lastName. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Your Last Name"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4 
                  responsive-login-form"
                  onChange={change}
                  value={Inputs.lastName}
                />

                {/* */}
              </div>

              {errors.lastName && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.lastName}
                </div>
              )}

              {/* ********************************** */}
              {/* Creating an input field for email. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <MdMarkEmailUnread className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  onChange={change}
                  value={Inputs.email}
                />

                {/* */}
              </div>

              {errors.email && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.email}
                </div>
              )}

              {/* ************************************* */}
              {/* Creating an input field for password. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <RiLockPasswordFill className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  /* When we will get showPassword then we will make our type as text otherwise password type. */
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Create a Password"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mb-[-10px] mr-4
                  responsive-login-form"
                  value={Inputs.password}
                  onChange={change}
                />

                {/* */}
              </div>

              {/* Using ternary operator when we will get showPassword then we will display show-icon
                  otherwise we will display hide-icon. 
              */}

              <span className="cursor-pointer" onClick={handleShowPassword}>
                {/* */}

                {showPassword ? (
                  <BiShow className="text-[22px]  ml-[400px] mt-[-47px] responsive-eye-icon" />
                ) : (
                  <BiHide className="text-[22px]  ml-[400px] mt-[-47px] responsive-eye-icon" />
                )}

                {/* */}
              </span>

              {errors.password && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.password}
                </div>
              )}

              {/* ******************** */}
              {/* Terms and conditions */}

              <div className="mt-4">
                <input
                  type="radio"
                  name="terms"
                  id="terms"
                  value="true"
                  className="text-2xl"
                  checked={Inputs.terms}
                  onChange={change}
                />
                <span className="text-[18px] font-bold font-sans ml-3 responsive-terms">
                  All terms and conditions apply
                </span>
              </div>

              {errors.terms && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.terms}
                </div>
              )}

              {/* ******************************* */}
              {/*  Creating a button to Register. */}

              <button
                disabled={loading}
                className="bg-slate-700 text-gray-300 p-3 py-4 rounded-lg uppercase hover:opacity-95 
                disabled:opacity-80 text-2xl font-bold font-sans mt-[20px] responsive-button"
              >
                {loading ? "Loading..." : "Register"}
              </button>

              {/* */}
            </form>

            {/******************************************************************************* */}
            {/* Creating a link to go to the register page when user already have an account. */}

            <div className="flex gap-2 mt-[20px] mb-[40px]">
              <p className="font-bold font-sans text-slate-700 text-2xl responsive-link">
                Already Registered ?
              </p>

              <Link to="/signIn">
                <span className="text-blue-700 font-bold font-sans text-3xl underline responsive-link1">
                  Login
                </span>
              </Link>
            </div>

            {/* */}
          </div>
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>

    /* */
  );

  /* */
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-form-portion {
      width: 500px;
    }

    .responsive-login-form {
      display: flex;
      flex-direction: column;
      font-size: 2rem;
    }

    .responsive-eye-icon {
      margin-top: -37px;
      margin-left: 270px;
      font-size: 2.7rem;
    }

    .responsive-terms {
      font-size: 2.2rem;
    }

    .responsive-button {
      font-size: 2rem;
    }

    .responsive-link {
      font-size: 2.3rem;
    }

    .responsive-link1 {
      font-size: 3rem;
    }

    .responsive-gender {
      font-size: 2.1rem;
    }

    /* */
  }

  /* */
`;
