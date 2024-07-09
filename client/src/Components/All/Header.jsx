/* */

import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";

import { FaTimes } from "react-icons/fa";

import { CiMenuFries } from "react-icons/ci";

import { Link, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import Dropdown from "./Dropdown.jsx";

export default function Header() {
  /* */

  const handleClick = () => {
    setClick(!click);
  };

  const { currentUser } = useSelector((state) => state.user);

  const [openProfile, setOpenProfile] = useState(false);

  /* Creating a logic to hide the dropdown menu when the user click on any part of the page. */
  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (event) => {
    /* */

    if (event.target !== menuRef.current && event.target !== imgRef.current) {
      setOpenProfile(false);
    }

    /* */
  });

  const [click, setClick] = useState(false);

  const content = (
    /* */

    <>
      <div
        className={
          click
            ? `lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 
               transition mt-5 z-[10]`
            : `hidden`
        }
      >
        <ul className="text-center text-xl p-20 ">
          {/* */}

          <div className="pt-3 pb-4">
            {/* */}

            {openProfile && <Dropdown handleClick={handleClick} />}

            {localStorage.getItem("id") ? (
              <Link
                className="hover:text-slate-600 font-semibold text-white"
                onClick={() => setOpenProfile((previous) => !previous)}
                ref={menuRef}
              >
                <img
                  src={currentUser ? currentUser.avatar : ""}
                  alt="profile"
                  className="rounded-full h-[50px] w-[50px] object-cover ml-5 responsive-dropdown"
                  ref={imgRef}
                />
              </Link>
            ) : (
              <Link
                to="/signIn"
                className="bg-slate-700 text-[#eee6e8] rounded-lg uppercase hover:opacity-95
                disabled:opacity-80 w-[100%] px-[20px] font-sans font-semibold text-[17px] 
               hover:text-[#478C5C] responsive-login-button"
                onClick={() => setClick(!click)}
              >
                LogIn
              </Link>
            )}

            {/* */}
          </div>

          <Link
            to="/"
            className=""
            spy="true"
            smooth="true"
            onClick={() => setClick(!click)}
          >
            <li
              className="my-4 py-4 border-b border-slate-800 text-gray-300 hover:bg-800 hover:rounded font-bold
              font-sans responsive-content"
            >
              Home
            </li>
          </Link>

          <Link
            to="/about"
            className=""
            spy="true"
            smooth="true"
            onClick={() => setClick(!click)}
          >
            <li
              className="my-4 py-4 border-b border-slate-800 text-gray-300 hover:bg-800 hover:rounded font-bold 
              font-sans responsive-content"
            >
              About
            </li>
          </Link>

          <Link
            to="/todo-lists"
            className=""
            spy="true"
            smooth="true"
            onClick={() => setClick(!click)}
          >
            <li
              className="my-4 py-4 border-b border-slate-800 text-gray-300 hover:bg-800 hover:rounded font-bold
              font-sans responsive-content"
            >
              My Todo Lists
            </li>
          </Link>

          {/* */}
        </ul>
      </div>
    </>

    /* */
  );

  useEffect(() => {}, [currentUser]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper className="bg-slate-900">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-[20px] px-20 py-[20px]">
        {/* */}

        {/* **************************************************************************************** */}
        {/* Creating a link with the company logo when click it will take us to go to the home-page. */}

        <div className="flex flex-1 items-center">
          <NavLink to="/">
            <h1 className="font-bold text-5xl border-2 border-gray-600 px-2 py-1">
              <span className="text-[#C9B1C6]">KEEP</span>
              <span className="text-[#db587f]">IT</span>
            </h1>
          </NavLink>
        </div>

        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 text-[18px] mt-3">
              {/* */}

              <Link to="/" className="" spy="true" smooth="true">
                <li
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                  hover:border-fuchsia-600 cursor-pointer text-2xl font-bold"
                >
                  Home
                </li>
              </Link>

              <Link to="/about" className="" spy="true" smooth="true">
                <li
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer text-2xl font-bold"
                >
                  About
                </li>
              </Link>

              <Link to="/todo-lists" className="" spy="true" smooth="true">
                <li
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer text-2xl font-bold"
                >
                  My Todo Lists
                </li>
              </Link>

              <div className="">
                {openProfile && <Dropdown />}

                {localStorage.getItem("id") ? (
                  <NavLink
                    className="hover:text-slate-600 font-semibold text-white"
                    onClick={() => setOpenProfile((previous) => !previous)}
                    ref={menuRef}
                  >
                    <img
                      src={currentUser ? currentUser.avatar : ""}
                      alt="profile"
                      className="rounded-full h-[50px] w-[50px] object-cover ml-9 mr-[-20px] mt-[-10px]"
                      ref={imgRef}
                    />
                  </NavLink>
                ) : (
                  <li>
                    <NavLink to="/signIn">
                      <button
                        className="bg-slate-600 text-[#98d338] rounded-lg uppercase hover:opacity-95
                        disabled:opacity-80 w-[100%] font-sans mt-[-5px] text-3xl font-bold
                      hover:text-[#478C5C] md:ml-8 md:py-3 md:px-4"
                      >
                        LogIn
                      </button>
                    </NavLink>
                  </li>
                )}
              </div>

              {/* */}
            </ul>
          </div>
        </div>

        {/* **************************************************************************** */}
        {/* When click will be true ie.. When user click on the <CiMenuFries /> react-icon 
            (ie.. menu icon) then we will show the contents present in the content variable. 
        */}

        <div>{click && content}</div>

        {/* ****************************************************************************************** */}
        {/* When click will be true ie.. When user click on the <CiMenuFries /> react-icon (ie.. menu icon) 
            then we will show the <FaTimes /> react-icon (ie.. close icon) otherwise we will show
            <CiMenuFries /> react-icon (ie.. menu icon).
        */}

        <button
          className="block sm:hidden transition responsive-button"
          onClick={() => setClick(!click)}
        >
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>

        {/* */}
      </div>
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

    .responsive-dropdown {
      margin-left: 250px;
      margin-top: -40px;
    }

    .responsive-content {
      font-size: 2.6rem;
    }

    .responsive-button {
      font-size: 3rem;
    }

    .responsive-login-button {
      font-size: 2.5rem;
      padding: 10px;
      padding-left: 14px;
      padding-right: 14px;
      background-color: #14527c;
    }

    /* */
  }

  /* */
`;
