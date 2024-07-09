/* */

import React from "react";

/* Importing BrowserRouter, Routes, Route  from react-router-dom

   BrowserRouter will give access to the routes from anywhere outside this file.
   Routes will work like container where we can keep all our Route.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "./GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";

/* ALL PAGES : */

import HomePage from "./Pages/All/HomePage.jsx";
import AboutPage from "./Pages/All/AboutPage.jsx";
import ContactPage from "./Pages/All/ContactPage.jsx";
import PrivacyPolicyPage from "./Pages/All/PrivacyPolicyPage.jsx";
import PageNotFoundPage from "./Pages/All/PageNotFoundPage.jsx";
import TermsAndConditionsPage from "./Pages/All/TermsAndConditionsPage.jsx";
import FaqPage from "./Pages/All/FaqPage.jsx";
import ComplaintSuccessPage from "./Pages/All/ComplaintSuccessPage.jsx";
import EmailSubscriptionSuccessPage from "./Pages/All/EmailSubscriptionSuccessPage.jsx";

import TodoListPage from "./Pages/All/TodoListPage.jsx";

/* USER PAGES : */

import ProfilePage from "./Pages/User/ProfilePage.jsx";

import SignUpPage from "./Pages/User/SignUpPage.jsx";
import SignInPage from "./Pages/User/SignInPage.jsx";
import SendLinkPage from "./Pages/User/SendLinkPage.jsx";
import ResetPasswordPage from "./Pages/User/ResetPasswordPage.jsx";

import VerificationPage from "./Pages/User/VerificationPage.jsx";
import MainVerificationPage from "./Pages/User/MainVerificationPage.jsx";

/* COMPONENT ALL PAGES : */

import Header from "./Components/All/Header.jsx";
import Footer from "./Components/All/Footer.jsx";

import Dropdown from "./Components/All/Dropdown.jsx";

import PrivateRoute from "./Components/All/PrivateRoute.jsx";
import VerificationPrivateRoute from "./Components/All/VerificationPrivateRoute.jsx";

/* COMPONENT USER PAGES : */

import UserDashboardPage from "./Components/User/UserDashboardPage.jsx";

/* *************************************************************************************** */

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

import {
  signOutUserSuccess,
  deleteAccessToken,
} from "./Redux/Actions/authActions.jsx";

export default function App() {
  /* */

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const handleAutoLogOut = async () => {
    /* */

    try {
      /* */

      dispatch(signOutUserSuccess());

      dispatch(deleteAccessToken());

      localStorage.clear();

      alert("Your session is expired. Please login again!");

      toast.success("Successfully Logged Out");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      /* */
    }

    /* */
  };

  /* ********************************************************************************** */
  /* ********************************** useEffect() hooks ***************************** */
  /* ********************************************************************************** */

  useEffect(() => {
    /* */

    if (token) {
      const { exp } = jwtDecode(token);

      const checkTokenValidity = () => {
        if (exp < Date.now() / 1000) {
          handleAutoLogOut();
        }
      };

      const interval = setInterval(checkTokenValidity, 3600000);

      return () => clearInterval(interval);
    }

    /* */
  }, [token]);

  const theme = {
    /* */

    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#080B39",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },

    /* */
  };

  /* ********************************************************************************** */
  /* **********************************    return    ********************************** */
  /* ********************************************************************************** */

  return (
    /* */

    <>
      {/* */}

      {/* Here we are Creating diffrent Route for different page of our website */}

      {/* We will provide themeprovider to all the components and in its props ie.. theme
          we are passing the theme variable where we provided styling created(defined) above.
      */}

      <ThemeProvider theme={theme}>
        {/* */}

        <BrowserRouter>
          {/* */}

          <GlobalStyle />

          <Header />

          {/* Here we are Creating diffrent Route for different page of our website */}

          <Routes>
            {/* */}

            {/* With the help of element we will show the components we want to show for 
                different web pages in different routes. 
            */}

            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policy" element={<PrivacyPolicyPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />

            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/signIn" element={<SignInPage />} />

            <Route path="/todo-lists" element={<TodoListPage />} />

            <Route path="/dropdown" element={<Dropdown />} />

            <Route
              path="/emailSubscription"
              element={<EmailSubscriptionSuccessPage />}
            />

            <Route path="/sendLink" element={<SendLinkPage />} />

            <Route
              path="/reset-password/:id/:token"
              element={<ResetPasswordPage />}
            />

            {/* Means when all the above routes is not found then show this route(PageNotFound) */}
            <Route path="*" element={<PageNotFoundPage />} />

            {/* *********************************************************************** */}
            {/* ***********************  Private Route  ******************************* */}
            {/* *********************************************************************** */}

            <Route element={<PrivateRoute />}>
              {/* */}

              <Route
                path="/complaintSuccess"
                element={<ComplaintSuccessPage />}
              />

              {/* */}
            </Route>

            <Route element={<VerificationPrivateRoute />}>
              {/* */}

              <Route
                path="/verification/:message/:statusCode"
                element={<VerificationPage />}
              />

              <Route
                path="/verify-email/:userId/:token/:email"
                element={<MainVerificationPage />}
              />

              {/* */}
            </Route>

            {/* *********************************************************************** */}
            {/* ***********************  User Private Route  ************************** */}
            {/* *********************************************************************** */}

            <Route path="/dashboard" element={<PrivateRoute />}>
              {/* */}

              <Route path="user" element={<UserDashboardPage />} />

              <Route path="user/profile" element={<ProfilePage />} />

              {/* */}
            </Route>

            {/* */}
          </Routes>

          <Footer />

          {/* */}
        </BrowserRouter>

        {/* */}
      </ThemeProvider>

      {/* */}
    </>
  );

  /* */
}
