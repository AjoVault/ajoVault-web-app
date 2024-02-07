import React from "react";
import { Outlet } from "react-router-dom";
import Register from "./components/Register/Register";

function RegisterOutlet() {
  return (
    <>
      <Outlet />
      <Register />
    </>
  );
}

export default RegisterOutlet;
