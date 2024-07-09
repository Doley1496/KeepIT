/* */

import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const UserMenu = () => {
  /* */

  /* ***************************************************************************** */
  /* *************************     return      *********************************** */
  /* ***************************************************************************** */

  return (
    /* */

    <Wrapper>
      <div className="text-center">
        {/* */}

        <h3 className="font-semibold uppercase mb-6 mt-6 text-gray-700 text-4xl responsive-heading">
          DASHBOARD
        </h3>

        <div className="flex flex-col gap-5 text-3xl mt-5">
          {/* */}

          <NavLink
            to="/dashboard/user/profile"
            className="bg-slate-700 text-white py-[20px] rounded-lg uppercase hover:opacity-95 
            disabled:opacity-80 font-sans font-bold mx-auto w-[100%] responsive-button"
          >
            My Profile
          </NavLink>

          <NavLink
            to="/todo-lists"
            className="bg-slate-700 text-white py-[20px] w-[100%] rounded-lg uppercase hover:opacity-95 
            disabled:opacity-80 font-sans font-bold mx-auto responsive-button"
          >
            My Todo Lists
          </NavLink>

          {/* */}
        </div>

        {/* */}
      </div>
    </Wrapper>

    /* */
  );

  /* */
};

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

    .responsive-heading {
      font-size: 3rem;
    }

    .responsive-button {
      font-size: 2.1rem;
      margin-right: 15px;
      padding: 20px;
      width: 70%;
    }

    /* */
  }

  /* */
`;
