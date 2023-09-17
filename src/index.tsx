import React from "react";
//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import Router from "./screens/Router";

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
  document.getElementById("root")
);
