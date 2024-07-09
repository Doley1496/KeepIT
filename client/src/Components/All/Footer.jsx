/* */

import React, { useState } from "react";

import styled from "styled-components";

import { toast } from "react-toastify";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Footer() {
  /* */

  const navigate = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
  });

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleEmailSubscription = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const res = await fetch(`${SERVER_URL}/api/user/emailSubscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(Inputs),

        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;
      }

      navigate("/emailSubscription");

      setInputs({
        email: "",
      });

      toast.success("You email is submitted successfully!");

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      console.log(error);

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* ************** */}
      {/* Footer section */}

      <footer className="">
        {/* */}

        {/* ***************************** */}
        {/*    Footer Header section.     */}

        <div className="grid grid-three-column">
          {/* */}

          {/* ************** */}
          {/* About section. */}

          <div
            className="footer-about"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-40 h-18 text-white p-2 rounded-full bg-slate-700 mx-auto responsive-logo"
              />
            </Link>

            <h1 className="font-bold text-3xl mt-4 responsive-heading">
              <span className="text-[#B4F8C8]">KEEP</span>
              <span className="text-[#D8CEE6]">IT</span>
            </h1>

            <p className="mt-4 font-bold text-2xl text-[#D8CEE6] responsive-heading1">
              Best place for note taking.
            </p>

            {/* */}
          </div>

          {/* ************************ */}
          {/* Email subscribe section. */}

          <div
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h3 className="text-[#bb4b4b] text-3xl mb-5 font-bold font-sans responsive-text">
              Subscribe to get important updates
            </h3>

            <form onSubmit={handleEmailSubscription}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="YOUR E-MAIL ID"
                required
                className="text-[17px] p-3 py-[7px] font-bold font-sans pt-3 rounded-lg"
                value={Inputs.email}
                onChange={change}
              />

              <button
                type="submit"
                className=" bg-indigo-500 text-white rounded-lg font-bold uppercase p-3 pb-[6px] 
                ml-[-10px] text-[18px]"
              >
                Subscribe
              </button>
            </form>

            {/* */}
          </div>

          {/* */}

          {/* ************ */}
          {/* Social Icons */}

          <div
            className="footer-social"
            style={{ textAlign: "center", display: "block" }}
          >
            {/* */}

            <p className="sm:text-left text-3xl mb-5 font-bold text-[#bb4b4b] responsive-heading3">
              Follow Us On
            </p>

            <div className="footer-social--icons">
              {/* */}

              <div>
                <Link to="https://www.facebook.com">
                  <FaFacebook className="icons" />
                </Link>
              </div>

              <div>
                <Link to="https://www.instagram.com">
                  <FaInstagram className="icons" />
                </Link>
              </div>

              <div>
                <Link to="https://www.youtube.com">
                  <FaYoutube className="icons" />
                </Link>
              </div>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* ***************************** */}
        {/*    Footer Bottom section.     */}

        <hr className="mb-5 mt-5 text-[#D8CEE6]" />

        <div className="grid grid-two-column">
          {/* */}

          <p className="flex flex-col text-[#D8CEE6] font-bold font-sans text-2xl responsive-copyright">
            © {new Date().getFullYear()} KEEP- IT
          </p>

          {/******************************************************************* */}
          {/* Creating a link to go to the PRIVACY POLICY page,  TERMS & CONDITIONS 
              page and CONTACT page and FAQ page.
          */}

          <div className="mt-3 justify-between mx-auto">
            {/* */}

            <NavLink
              to="/terms"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              TERMS & CONDITIONS
            </NavLink>

            <NavLink
              to="/policy"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              PRIVACY POLICY
            </NavLink>

            <NavLink
              to="/faq"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              FAQ's
            </NavLink>

            <NavLink
              to="/contact"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              CONTACT US
            </NavLink>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* *********** */}
        {/* Decription. */}

        <div
          className="pt-[30px] text-[#da539b]"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          {/* */}

          <p className="text-[16px] font-bold mb-5">
            {/* */}

            <p> Make life organized pvt.ltd</p>

            <p> Golaghat, Assam, India - 785 621 </p>

            <p> Phone: +91 9101134037, </p>

            <p className="mx-4">
              Fax: +91 471 2322279, E-mail: infokeepIt@gmail.com
            </p>

            <p className="mx-[13px]">
              <span> All rights reserved </span>
              <span className="text-[18px] mt-1"> © </span>
              <span> KeepIT {new Date().getFullYear()} </span>
              <span className="text-orange-700"> Copyright </span> |
              <span className="text-orange-700"> Terms of Use. </span>
            </p>

            {/* */}
          </p>

          {/* */}
        </div>

        {/* ***************** */}
        {/* Developer section */}

        <div className="pt-[40px]">
          <h3 className="text-gray-300 text-center text-2xl font-sans font-bold mt-10 responsive-text">
            ✸
            <span className="ml-3 mr-3 ">
              Design And Developed By Doley Tech
            </span>
            ✸
          </h3>
        </div>

        {/* */}
      </footer>

      {/* */}
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
    margin: 15px;
  }

  .grid-three-column {
    grid-template-columns: 0.8fr 1.7fr 0.8fr;
  }

  footer {
    padding: 4rem 0 9rem 0;

    background-color: ${({ theme }) => theme.colors.footer_bg};

    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 0.5rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};
        hover: opacity-75;

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    footer {
      padding: 4rem 0 4rem 0;
    }

    footer {
      padding: 14rem 0 9rem 0;

      background-color: ${({ theme }) => theme.colors.footer_bg};

      .footer-social--icons {
        display: flex;
        gap: 2rem;

        div {
          padding: 0.5rem;
          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white};
          hover: opacity-75;

          .icons {
            color: ${({ theme }) => theme.colors.white};
            font-size: 3rem;
            position: relative;
            cursor: pointer;
          }
        }
      }
    }

    .grid-two-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      display: "block";
    }

    .grid-three-column {
      margin-left: 3px;
      margin-right: 3px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .responsive-logo {
      margin: auto;
      width: 80px;
      height: 80px;
    }

    .responsive-copyright {
      font-size: 2.3rem;
    }

    .responsive-link {
      display: flex;
      align-items: center;
      display: "block";
      font-size: 2.3rem;
    }

    .responsive-text {
      font-size: 2.1rem;
      align-items: center;
      margin-bottom: 30px;
    }

    .responsive-heading {
      font-size: 2.9rem;
    }

    .responsive-heading1 {
      font-size: 1.9rem;
      padding-top: 10px;
    }

    .responsive-heading3 {
      font-size: 2.9rem;
      padding-top: 10px;
      padding-bottom: 14px;
    }

    /* */
  }

  /* */
`;
