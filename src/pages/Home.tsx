import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <p>Home Page (Protected by Firebase!)</p>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
