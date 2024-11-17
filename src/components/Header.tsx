import { onAuthStateChanged, signOut, User } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";

// import "./Todolist/Todolist.css";

import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface AuthDetailsProps {
  setAuthUser: (user: User | null) => void; // Declare the type for setAuthUser prop
  setUserId: React.Dispatch<React.SetStateAction<string | null>>; // Assuming userId can be null
}

const Header: React.FC<AuthDetailsProps> = ({ setAuthUser, setUserId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUser(user);

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUserId(uid);
        //navigate("/");
        console.log("uid", uid);
        console.log(user);
      } else {
        setAuthUser(null);
        setUser(null);
        // User is signed out
        navigate("/");
        console.log("user is logged out");
      }
    });
  }, [setAuthUser]);

  const userSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false); // Hide element if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(user?.photoURL);

  return (
    <div
      className="flex justify-end mr-28 w-full bg-emerald-400 p-7"
      //onClick={() => setIsDropdownOpen((prev) => !prev)}
    >
      <div className="relative">
        {!user ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDropdown}
              className="relative w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden focus:outline-none"
            >
              {/* <img
                 src={user?.photoURL || "/default-avatar.png"} 
                alt="User Avatar"
                className="w-full h-full object-cover"
              /> */}
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white dark:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                ref={elementRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
              >
                <Link
                  to="/login"
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDropdown}
              className="relative w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden focus:outline-none"
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            <p className="text-sm">Signed In as</p>
            <p className="text-base font-semibold">{user.email}</p>
            {isDropdownOpen && (
              <div
                ref={elementRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
              >
                <button
                  onClick={userSignout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          // <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
          //   <p className="text-sm">Signed In as</p>
          //   <p className="text-base font-semibold">{user.email}</p>
          //   <button
          //     onClick={userSignout}
          //     className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          //   >
          //     Logout
          //   </button>
          // </div>
        )}
      </div>

      {/* /////////////////////// */}
      {/*  
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Signed In as</p>
          <p className="text-base font-semibold">{user.email}</p>
          <button
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 w-36 text-lg"
            onClick={userSignout}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* <Header /> 
          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-lg">
              <a href="/login">Login</a>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 text-lg">
              <a href="/signup">Signup</a>
            </button>
          </div>
        </div>
      )}*/}
    </div>
  );
};

export default Header;
