/* */

import React from "react";

import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  /* */

  const { currentUser, token } = useSelector((state) => state.user);

  return currentUser && token ? <Outlet /> : <Navigate to="/signIn" />;

  /* */
}