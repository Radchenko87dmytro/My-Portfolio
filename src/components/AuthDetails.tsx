import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        setAuthUser(null);
        // User is signed out
        //navigate("/login");
        console.log("user is logged out");
      }
    });

    // return () =>{
    //   listen()
    // }
  }, []);

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
    <div>
      {authUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>Signed In as</p>
          <p>{authUser.email}</p>
          <button
            style={{
              width: "100px",
              fontSize: "18px",
              padding: "5px",
              marginTop: "15px",
            }}
            onClick={userSignout}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="logut-container">
          <div className="button-log">
            <button style={{ height: "30px", fontSize: "20px" }}>
              <a href={`/login`}>Login </a>
            </button>
            <button style={{ height: "30px", fontSize: "20px" }}>
              <a href={`/signup`}>Signup</a>
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ marginTop: "10px" }}>Signed Out</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
