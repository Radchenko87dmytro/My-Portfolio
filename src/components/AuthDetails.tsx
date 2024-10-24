import { onAuthStateChanged, signOut, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";

import { Button, Form } from "react-bootstrap";
import Header from "./Header";

interface AuthDetailsProps {
  setAuthUser: (user: User | null) => void; // Declare the type for setAuthUser prop
  setUserId: React.Dispatch<React.SetStateAction<string | null>>; // Assuming userId can be null
}

const AuthDetails: React.FC<AuthDetailsProps> = ({
  setAuthUser,
  setUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUser(user);
        // setUser(user);
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

    // return () =>{
    //   listen()
    // }
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

  return (
    //authUser={authUser}

    // <div>
    //   {user ? (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <p>Signed In as</p>
    //       <p>{user.email}</p>
    //       <button
    //         className="sign-out"
    //         style={{
    //           width: "100px",
    //           fontSize: "18px",
    //           padding: "5px",
    //           marginTop: "15px",
    //         }}
    //         onClick={userSignout}
    //       >
    //         Sign Out
    //       </button>
    //     </div>
    //   ) : (
    //     <div className="logut-container">
    //       <div className="button-log">
    //         <button style={{ height: "30px", fontSize: "20px" }}>
    //           <a id="log" href={`/login`}>
    //             Login{" "}
    //           </a>
    //         </button>
    //         <button style={{ height: "30px", fontSize: "20px" }}>
    //           <a href={`/signup`}>Signup</a>
    //         </button>
    //       </div>
    //       <div style={{ display: "flex", justifyContent: "center" }}>
    //         <p style={{ marginTop: "10px" }}>Signed Out</p>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div>
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Signed In as</p>
          <p className="text-base font-semibold">{user.email}</p>
          <button
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 w-24 text-lg"
            onClick={userSignout}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* <Header /> */}
          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-lg">
              <a href="/login">Login</a>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 text-lg">
              <a href="/signup">Signup</a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
