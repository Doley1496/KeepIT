/* */

import React from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

export default function AboutPage() {
  /* */

  return (
    /* */

    <Wrapper>
      <Layout title={"About Page"}>
        {/* */}

        <PageNavigation title="About Page" />

        <div className="py-20 px-4 max-w-6xl mx-auto text-2xl">
          {/* */}

          <h1 className="text-6xl font-bold mb-8 text-slate-800">
            About KeepIt
          </h1>

          <p className="mb-4 text-slate-700 font-bold responsive-text">
            keepIt is a Professional Note taking Platform. Here we will provide
            you only interesting content, which you will like very much. We're
            dedicated to providing you the best of Note taking, with a focus on
            dependability and notes writing. We're working to turn our passion
            for Note taking into a booming online website. We hope you enjoy our
            Note taking as much as we enjoy offering them to you.
          </p>

          <p className="mb-4 text-slate-700 font-bold responsive-text">
            At keepIt, we understand that taking notes can be a tedious and
            overwhelming task. That's why we have created a user-friendly
            note-taking webpage similar to google keep, to make your life
            easier. Our team of dedicated professionals has years of experience
            in the tech industry and a passion for making organization and
            productivity accessible to everyone. We saw the need for a simple,
            efficient note-taking platform and decided to fill that gap with
            keepIt. Founded in 2015, our goal is to provide a seamless
            note-taking experience for individuals and businesses alike. With
            our intuitive design and advanced features, you can easily create,
            organize, and access your notes from any device.Whether you're a
            busy professional or a student trying to stay on top of their
            studies, keepIt is here to help you stay organized and focused. Join
            the thousands of satisfied users who have made the switch to keepIt
            today!
          </p>

          <p className="mb-4 text-slate-700 font-bold responsive-text">
            Our mission is to help our clients achieved their daily tasks.
          </p>

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
      line-height: 1.6;
      font-weight: bold;
      font-size: 1.8rem;
    }

    /* */
  }

  /* */
`;
