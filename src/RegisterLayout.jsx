import React from "react";
import { Outlet } from "react-router-dom";
import Register from "./components/Register/Register";

function RegisterOutlet() {
  return (
    <>
      <Register />
      <Outlet />
    </>
  );
}

export default RegisterOutlet;
