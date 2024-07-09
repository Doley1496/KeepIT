/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import TodoCard from "../../Components/All/TodoCard.jsx";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let userId = localStorage.getItem("id");

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TodoList() {
  /* */

  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({ title: "", body: "" });

  const [ContentArray, setContentArray] = useState([]);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const showBody = () => {
    document.getElementById("textArea").style.display = "block";
  };

  const change = (event) => {
    /* */

    /* Destructing the name and value from event.target. */
    const { name, value } = event.target;

    /* We are setting(storing) the Inputs array ie. setInputs() with all the previous values of the 
       Inputs array(using spread operator) and also storing the name(title and body) 
       and value(what title and body provided by the user) in key value pairs.
    */
    setInputs({ ...Inputs, [name]: value });

    /* */
  };

  const createTodoList = async () => {
    /* */

    /* If the title field or the body field is empty then we will give a toast error message. */

    if (Inputs.title === "" || Inputs.body === "") {
      /* */

      /* When title or body is empty then we will display a error message. */
      toast.error("Title Or Body cannot be empty");

      /* 
       Else we will check the id.
       
       If we get the user's id we wil make a axios post request to the following 
       route and provide all the details of this input fields to the controller of this following route
       ie. createTaskController.
       
       Otherwise we will successfully we will make the input fields empty and give a toast success message. 

      */
    } else {
      /* */

      if (userId) {
        /* */

        const res = await fetch(`${SERVER_URL}/api/todo/create-task`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            ...Inputs,
            id: userId,
          }),

          credentials: "include",
        });

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

        setInputs({ title: "", body: "" });

        toast.success("Your task is added");

        /* Reloading the web-page. */
        window.location.reload();

        /* */
      } else {
        /* */

        setContentArray([...ContentArray, Inputs]);

        setInputs({ title: "", body: "" });

        toast.success("Your task is added");

        toast.error("Your task is not saved! Please login to save");

        /* */
      }

      /* */
    }

    /* */
  };

  const getTodoLists = async () => {
    /* */

    try {
      /* */

      if (userId) {
        /* */

        const res = await fetch(`${SERVER_URL}/api/todo/get-task/${userId}`, {
          method: "GET",
          credentials: "include",
        });

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

        setContentArray(data?.allTodos);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* **********************************  useEffect() hooks  ****************************** */
  /* ************************************************************************************* */

  useEffect(() => {
    /* */

    getTodoLists();

    /* */
  }, []);

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Todo-Lists-Page"}>
        {/* */}

        <PageNavigation title="Todo-Lists" />

        <div className="bg-[#f3cdcd] pt-5">
          {/* */}

          {/* *********************************************************** */}
          {/* Creating Title input field, Body input field, and a button. */}

          <div
            className="p-3 m-5 mx-auto border rounded-lg bg-gray-600 shadow-md hover:shadow-lg 
            border-box shadow-slate-100 max-w-3xl max-h-4xl"
            style={{ textAlign: "center", display: "block" }}
          >
            {/* */}

            <div className="flex flex-col p-4 m-6">
              {/* */}

              {/* Creating input field for TITLE */}
              <input
                type="text"
                placeholder="TITLE   ✍"
                name="title"
                autoFocus="on"
                // value={Inputs.title || ""}
                value={Inputs.title}
                className="my-4 pl-3 py-[20px] border rounded-lg text-3xl font-semibold font-sans
                responsive-input"
                onClick={showBody}
                onChange={change}
              />

              {/* Creating input field for BODY */}
              <textarea
                type="text"
                placeholder="BODY   ✍"
                name="body"
                // value={Inputs.body || ""}
                value={Inputs.body}
                className="pl-3 py-[20px] border rounded-lg text-3xl font-semibold font-sans hidden 
                responsive-input"
                id="textArea"
                onChange={change}
              />

              {/* */}
            </div>

            <button
              disabled={loading}
              onClick={createTodoList}
              className="bg-[#800000] text-gray-100 text-[20px] py-[16px] rounded-lg uppercase 
              hover:opacity-95 disabled:opacity-80 font-semibold font-sans mb-[30px] w-[50%] responsive-button"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>

            {/* */}
          </div>

          {/* ********************************************************************************** */}
          {/* Dynamically accessing the above ContentArray of the useState() using map function. */}

          <div className="row mt-2 mb-2 p-3">
            {/* */}

            {ContentArray &&
              ContentArray.map((item, index) => (
                /* */

                <div
                  key={index}
                  className="my-2 col-lg-3 col-md-2 col-10 ml-[80px] pb-[40px] responsive-card"
                >
                  {/* */}

                  <TodoCard item={item} cardId={item._id} />

                  {/* */}
                </div>

                /* */
              ))}

            {/* */}
          </div>

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

    .responsive-input {
      font-size: 2.4rem;
      line-height: 1.4;
    }

    .responsive-card {
      margin: auto;
    }

    .responsive-button {
      width: 50%;
      padding: 10px;
    }

    /* */
  }

  /* */
`;
