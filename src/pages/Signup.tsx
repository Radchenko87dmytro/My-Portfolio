import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { error } from "console";
import { NavLink } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    //<a href={`/`}>Back Home </a> <h2>Signup</h2>

    <Form className="flex flex-col justify-center items-center">
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted flex flex-col">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    // <form className="flex flex-col  justify-center max-w-screen-sm">
    //   {/* <!-- Email input --> */}
    //   <div
    //     data-mdb-input-init
    //     className="form-outline mb-4 flex flex-col justify-center"
    //   >
    //     <input type="email" id="form2Example1" className="form-control" />
    //     <label className="form-label" htmlFor="form2Example1">
    //       Email address
    //     </label>
    //   </div>

    //   {/* <!-- Password input --> */}
    //   <div
    //     data-mdb-input-init
    //     className="form-outline mb-4 flex flex-col justify-center"
    //   >
    //     <input type="password" id="form2Example2" className="form-control" />
    //     <label className="form-label" htmlFor="form2Example2">
    //       Password
    //     </label>
    //   </div>

    //   {/* <!-- 2 column grid layout for inline styling --> */}
    //   <div className="row mb-4 flex flex-col justify-center">
    //     <div className="col d-flex justify-content-center">
    //       {/* <!-- Checkbox --> */}
    //       <div className="form-check">
    //         <input
    //           className="form-check-input"
    //           type="checkbox"
    //           value=""
    //           id="form2Example31"
    //           checked
    //         />
    //         <label className="form-check-label" htmlFor="form2Example31">
    //           {" "}
    //           Remember me{" "}
    //         </label>
    //       </div>
    //     </div>

    //     <div className="col">
    //       {/* <!-- Simple link --> */}
    //       <a href="#!">Forgot password?</a>
    //     </div>
    //   </div>

    //   {/* <!-- Submit button --> */}
    //   <button
    //     type="button"
    //     data-mdb-button-init
    //     data-mdb-ripple-init
    //     className="btn btn-primary btn-block mb-4"
    //   >
    //     Sign in
    //   </button>

    //   {/* <!-- Register buttons --> */}
    //   <div className="text-center">
    //     <p>
    //       Not a member? <a href="#!">Register</a>
    //     </p>
    //     <p>or sign up with:</p>
    //     <button
    //       type="button"
    //       data-mdb-button-init
    //       data-mdb-ripple-init
    //       className="btn btn-link btn-floating mx-1"
    //     >
    //       <i className="fab fa-facebook-f"></i>
    //     </button>

    //     <button
    //       type="button"
    //       data-mdb-button-init
    //       data-mdb-ripple-init
    //       className="btn btn-link btn-floating mx-1"
    //     >
    //       <i className="fab fa-google"></i>
    //     </button>

    //     <button
    //       type="button"
    //       data-mdb-button-init
    //       data-mdb-ripple-init
    //       className="btn btn-link btn-floating mx-1"
    //     >
    //       <i className="fab fa-twitter"></i>
    //     </button>

    //     <button
    //       type="button"
    //       data-mdb-button-init
    //       data-mdb-ripple-init
    //       className="btn btn-link btn-floating mx-1"
    //     >
    //       <i className="fab fa-github"></i>
    //     </button>
    //   </div>
    // </form>

    ///////////////////////

    // <main className="signup-container">
    //   <section>
    //     <div>
    //       <div>
    //         <h1> Create Account </h1>
    //         <form>
    //           <div className="email container">
    //             <label htmlFor="email-address">Email address</label>
    //             <input
    //               // className="input-container"
    //               type="email"
    //               //label="Email address"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               required
    //               placeholder="Email address"
    //             />
    //           </div>

    //           <div className="password container">
    //             <label htmlFor="password">Password</label>
    //             <input
    //               type="password"
    //               //label="Create password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //               placeholder="Password"
    //             />
    //           </div>

    //           <button className="sign-up" type="submit" onClick={onSubmit}>
    //             Sign up
    //           </button>
    //         </form>

    //         <p>
    //           Already have an account? <NavLink to="/login">Sign in</NavLink>
    //         </p>
    //       </div>
    //     </div>
    //   </section>
    // </main>
  );
};

export default Signup;
