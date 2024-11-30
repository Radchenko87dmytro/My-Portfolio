import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutMe from "./pages/AboutMe";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthContext";
import HeaderTailwind from "./components/HeaderTailwind";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/aboutme",
    element: <AboutMe />,
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <HeaderTailwind />
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
);
