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

        <div
          className="py-20 px-4 max-w-10xl h-[700px] mx-auto text-center"
          style={{
            backgroundImage: "url(/images/todo2.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "color-burn",
          }}
        >
          {/* */}

          <div
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-center text-7xl mb-7 font-extrabold leading-14 text-[#db343c]">
              Organize your <br /> work and life <br />
              at an efficient way
              <br />
            </h1>

            <h1
              className="mb-7 font-bold font-sans leading-[35px] text-4xl text-[#06040A] 
            bg-[white] py-[30px] w-[50%] mx-auto rounded-lg responsive-text"
            >
              Make your everyday work done <br /> Single app that will make your
              life to <br />
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
              disabled:opacity-80 font-sans font-semibold w-[30%] hover:bg-[#3dbe68] responsive-button"
            >
              Create Todo List
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
      margin: auto;
      width: 100%;
    }

    .responsive-button {
      margin-top: 20px;
      font-size: 3.4rem;
      font-weight: bold;
      width: 100%;
      height: 80px;

      background: #ffffff;
      color: #db343c;
    }

    /* */
  }

  /* */
`;
