/* */

import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

export default function ComplaintSuccess() {
  /* */

  return (
    /* */

    <Wrapper>
      <div style={{ textAlign: "center", display: "block" }}>
        {/* */}

        <img
          src="/images/tick.webp"
          alt=""
          className="h-[80px] w-[80px] mx-auto mt-5"
        />

        <h1 className="font-bold text-4xl p-5 text-green-600 responsive-text">
          Your Complaint has been submitted!
        </h1>

        <p className="font-bold text-3xl mb-[50px] responsive-text1">
          We will reply you very soon !
        </p>

        <div
          className="flex justify-center py-4 px-5 gap-3 bg-slate-700 text-white border 
          rounded-lg hover:opacity-250 mb-60 uppercase w-[45%] mx-auto text-3xl font-bold responsive-button"
          style={{ textAlign: "center", display: "block" }}
        >
          <Link to="/">Go Back</Link>
        </div>

        {/* */}
      </div>
    </Wrapper>

    /*
    
    */
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
      font-size: 3rem;
    }

    .responsive-text1 {
      font-size: 2.4rem;
    }

    .responsive-button {
      font-size: 2.4rem;
    }

    /* */
  }

  /* */
`;
