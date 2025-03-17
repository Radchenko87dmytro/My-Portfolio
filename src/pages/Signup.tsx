import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, NavLink } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (email.match(/^[^@]+@[^@]+\.[^@]+$/) && password?.length > 5) {
      setError(false);
    } else {
      setError(true);
    }
  }, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
    <div className="flex justify-center p-4 sm:p-8 md:p-16 bg-slate-50">
      <div className="flex min-h-full flex-col justify-center px-4 py-6 sm:px-8 sm:py-10 lg:px-24 border-2 rounded-md divide-gray-300 border-solid shadow-xl bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-xl ">
          <h2 className="mt-10 text-center font-bold leading-9 tracking-tight text-gray-900   text-sm md:text-xl lg:text-2xl">
            Create Account
          </h2>
        </div>

        <div className="mt-6 w-full sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl  ">
          <form className="space-y-6 " action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 ">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs sm:text-sm leading-5 sm:leading-6 md:text-sm md:leading-7 
                lg:text-base lg:leading-8 
                xl:text-lg xl:leading-9"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs leading-5 sm:leading-6 md:text-sm md:leading-7 
                      lg:text-base lg:leading-8 
                      xl:text-lg xl:leading-9"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm mt-4">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              {error ? (
                <p className="text-sm font-semibold text-rose-600 hover:text-rose-500">
                  Incorrect email or password?
                </p>
              ) : (
                <p></p>
              )}
              <button
                disabled={error}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-xs sm:text-sm md:py-3 md:text-sm disabled:bg-slate-600 disabled:text-slate-500"
                onClick={onSubmit}
              >
                Sign up
              </button>
            </div>

            <div>
              Already have an account?
              <NavLink to="/login" className="nav-link">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-xs sm:text-sm md:py-3 md:text-sm"
                >
                  Sign in
                </button>
              </NavLink>
            </div>

            <div>
              <NavLink to="/" className="nav-link">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-xs sm:text-sm md:py-3 md:text-sm"
                >
                  Go home
                </button>
              </NavLink>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
