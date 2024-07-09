/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let userId = localStorage.getItem("id");

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function UpdateModal({ modal, toggle, item, cardId }) {
  /* */

  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({ title: "", body: "" });

  const [loading, setLoading] = useState(false);

  const change = (event) => {
    /* */

    /* Destructing the name and value from event.target. */
    const { name, value } = event.target;

    setInputs({ ...Inputs, [name]: value });

    /* */
  };

  const updateTodoList = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${SERVER_URL}/api/todo/update-task/${cardId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              ...Inputs,
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

            toast.error(data.message);

            setLoading(false);

            setError(data.message);

            return;

            /* */
          }

          /* */
        }

        setLoading(false);

        toast.success("Your task is updated");

        /* After successfully updating the todo list we will making the input fields empty. */
        setInputs({ title: "", body: "" });

        window.location.reload();

        /* */
      } else {
        /* */

        toast.error("Please login to update your task.");

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      setLoading(false);

      console.log(error);

      /* */
    }

    /* */
  };

  /* ***************************************************************************** */
  /* *************************   useEffect() hooks  ****************************** */
  /* ***************************************************************************** */

  useEffect(() => {
    /* */

    setInputs({
      title: item.title,
      body: item.body,
    });

    /* */
  }, [item]);

  /* ***************************************************************************** */
  /* *************************     return      *********************************** */
  /* ***************************************************************************** */

  return (
    /* */

    <Wrapper>
      <div className="bg-slate-700">
        {/* */}

        <Modal isOpen={modal} toggle={toggle} className="bg-slate-700">
          {/* */}

          <ModalHeader
            toggle={toggle}
            style={{ fontSize: "30px", backgroundColor: "#F3E1C0" }}
            className="responsive-heading"
          >
            Update Your Todo List
          </ModalHeader>

          <ModalBody style={{ backgroundColor: "#955670" }}>
            {/* */}

            <form className="bg-slate-700 rounded-lg">
              {/* */}

              {/* ****************************** */}
              {/* Creating input field for TITLE */}

              <input
                type="text"
                name="title"
                placeholder="TITLE"
                value={Inputs.title || ""}
                onChange={change}
                className="p-4 border rounded-lg text-[20px] font-bold mx-10 mt-10 responsive-input-text"
              />

              {/* ***************************** */}
              {/* Creating input field for BODY */}

              <textarea
                name="body"
                placeholder="BODY"
                value={Inputs.body || ""}
                onChange={change}
                className="my-5 p-4 border rounded-lg text-[20px] font-bold mx-10 w-[75%] 
                responsive-input-text"
              />

              {/* */}
            </form>

            {/* */}
          </ModalBody>

          <ModalFooter style={{ backgroundColor: "#F3E1C0" }}>
            {/* */}

            <button
              disabled={loading}
              className="bg-green-900 text-[#D8CEE6] px-[27px] py-[14px] text-[18px] font-bold font-sans   
              rounded-lg uppercase responsive-button-text"
              onClick={updateTodoList}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              className="bg-red-900 text-[#D8CEE6] px-[27px] py-[14px] text-[18px] font-bold font-sans
              rounded-lg uppercase responsive-button-text"
              onClick={toggle}
            >
              Close
            </button>

            {/* */}
          </ModalFooter>

          {/* */}
        </Modal>

        {/* */}
      </div>
    </Wrapper>

    /* */
  );

  /* */
}

/* */

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

    .responsive-input-text {
      font-size: 3rem;
    }

    .responsive-icon {
      font-size: 2.7rem;
    }

    .responsive-heading {
      font-size: 1rem;
    }

    .responsive-button-text {
      font-size: 2.7rem;
      padding: 10px;
    }

    /* */
  }

  /* */
`;
