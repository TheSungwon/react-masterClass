import {
  Route,
  Routes,
  BrowserRouter,
  createBrowserRouter,
} from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";
import About from "./About";
import Root from "../Root";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      { path: "", element: <Home /> },
    ],
  },
]);

export default Router;
