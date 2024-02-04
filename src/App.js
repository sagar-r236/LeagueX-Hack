import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Body from "./components/Body";
import Test from "./components/Test";
import SignUpForm from "./components/Auth/SignUpForm";
import Login from "./components/Auth/Login";
import BookRecomendataion from "./components/BookRecomentation/BookRecomendataion";
import Profile from "./components/Account/Profile";
import AddBook from "./components/AddBook";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppComponent = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/body",
        element: <Test />,
      },
      {
        path: "/test",
        element: <AddBook />,
      },
      {
        path: "/personal-recomentations",
        element: <BookRecomendataion />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

root.render(<RouterProvider router={appRouter} />);
