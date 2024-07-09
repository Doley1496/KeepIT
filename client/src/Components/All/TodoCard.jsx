/* */

import React, { useState } from "react";

import styled from "styled-components";

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import TodoUpdateModal from "./TodoUpdateModal.jsx";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let userId = localStorage.getItem("id");

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TodoCard({ item, cardId }) {
  /* */

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const toggle = () => {
    /* */

    setModal(!modal);

    /* */
  };

  const deleteTodoList = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      if (userId) {
        /* */

        const res = await fetch(
          `${SERVER_URL}/api/todo/delete-task/${cardId}`,
          {
            method: "DELETE",

            body: JSON.stringify({
              id: userId,
            }),

            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          if (data.statusCode === 401) {
            /* */

            setLoading(false);

            dispatch(signOutUserSuccess());

            localStorage.clear();

            alert(
              "Your cookie is mismatched. You are signing out of our account!"
            );

            toast.success("Successfully Logged Out");

            return;

            /* */
          } else {
            /* */

            setError(data.message);

            toast.error(data.message);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        toast.success("Your task is deleted");

        window.location.reload();

        /* */
      } else {
        /* */

        toast.error("Please! Login First");

        /* */
      }

      /* Catching the error and console logging it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      console.log(error);

      /* */
    }

    /* */
  };

  /* ***************************************************************************** */
  /* *************************     return      *********************************** */
  /* ***************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div
        className="p-3 border rounded-lg font-semibold uppercase bg-slate-400 hover:scale-105 
        transition-scale duration-300 w-[auto] h-[auto]"
        style={{
          textAlign: "center",
          display: "block",
        }}
      >
        {/* */}

        {/* ********************************************************************** */}
        {/* Displaying the title of the Todo list which is send as props by the parent
            (TodoList component). 
        */}

        <div className="mt-4 mb-[60px]">
          {/* */}

          <h5 className="text-3xl font-bold font-sans responsive-text">
            {item.title}
          </h5>

          <p className="pt-4 text-2xl font-bold font-mono text-[#3B0918] responsive-text">
            {item.body.split("")}
          </p>

          {/* */}
        </div>

        {/* ****************************************** */}
        {/* Creating the update and the delete button. */}

        <div className="flex justify-around mt-9 mb-4">
          {/* */}

          <div
            className="flex justify-center items-center px-2 py-1 cursor-pointer uppercase "
            onClick={() => setModal(true)}
          >
            <MdEditSquare
              className="font-bold text-3xl cursor-pointer hover:scale-105 transition-scale 
              text-[#116530] responsive-icon"
            />
            <span className="text-2xl font-bold font-sans responsive-icon-text">
              Update
            </span>
          </div>

          <div
            className="flex justify-center items-center px-2 py-1 cursor-pointer uppercase"
            onClick={deleteTodoList}
          >
            <RiDeleteBin5Line
              className="font-bold text-3xl cursor-pointer hover:scale-105 transition-scale
              text-[#a83737] responsive-icon"
            />
            <span className="text-2xl font-bold font-sans responsive-icon-text">
              Delete
            </span>
          </div>

          {/* */}
        </div>

        {/* ************************************************************** */}
        {/* Calling the TodoUpdateModal component and passing some values. */}

        <div className="">
          <TodoUpdateModal
            modal={modal}
            toggle={toggle}
            item={item}
            cardId={cardId}
          />
        </div>

        {/* */}
      </div>

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

    .responsive-text {
      font-size: 2.4rem;
      font-weight: bold;
      line-height: 1.4;
    }

    .responsive-icon {
      font-size: 2.6rem;
    }

    .responsive-icon-text {
      font-size: 2.1rem;
    }

    /* */
  }

  /* */
`;
