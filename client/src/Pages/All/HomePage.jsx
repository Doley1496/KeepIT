/* */

import React from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import { Link } from "react-router-dom";

export default function HomePage() {
  /* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Home-Page"}>
        {/* */}

        <div className="py-20 px-4 max-w-10xl h-[700px] mx-auto text-center bg-image3 ">
          {/* */}

          <div
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-center text-7xl mb-7 text-bold text-red-700">
              Organize your <br /> work and life <br />
              at an efficient way
              <br />
            </h1>

            <h1 className="mb-7 font-bold font-sans leading-[35px] text-3xl text-[#1a080f] responsive-text">
              Make your everyday work done. <br /> Single app that will make
              your life to <br />
              remember of all your things to be done
            </h1>

            {/* */}
          </div>

          <Link
            to="/todo-lists"
            style={{
              textAlign: "center",
              display: "block",
            }}
            className="mt-[40px] hover:scale-105 transition-scale duration-300"
          >
            <button
              className="bg-slate-900 text-gray-300 px-5 py-4 text-4xl rounded-lg uppercase hover:opacity-95 
              disabled:opacity-80 font-sans font-semibold w-[30%] responsive-button"
            >
              Make Todo List
            </button>

            {/* */}
          </Link>

          {/* */}
        </div>

        {/* */}
      </Layout>
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

    .responsive-text {
      font-size: 2.4rem;
      line-height: 1.6;
    }

    .responsive-button {
      font-size: 3rem;
      font-weight: bold;
      width: 75%;
      height: 70px;
    }

    /* */
  }

  /* */
`;
