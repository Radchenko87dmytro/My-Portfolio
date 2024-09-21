import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    //<a href={`/`}>Back Home </a> <h2>Login</h2>
    <div className="login-container">
      <section>
        <div>
          <h1> Login to your Account</h1>

          <form>
            <div className="email container">
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password container">
              <label htmlFor="password">Password</label>
              <div className="password-conteiner">
                <input
                  id="password"
                  name="password"
                  type="password" //{showPassword ? "text" : "password"}
                  value={password}
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <button
                  className="show-password"
                  onClick={togglePasswordVisibility}
                  style={{ marginLeft: "10px" }}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button> */}
              </div>
            </div>

            <div>
              <button className="login" onClick={onLogin}>
                Login
              </button>
            </div>
          </form>

          <p className="text-sm text-white text-center">
            No account yet? <NavLink to="/signup">Sign up</NavLink>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
