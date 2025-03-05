import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { AuthDetailsProps } from "./Header";
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

interface AuthDetailsProps {
  setAuthUser: (user: User | null) => void; // Declare the type for setAuthUser prop
  setUserId: (id: string | null) => void; // Assuming userId can be null
}

function classNames(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const HeaderTailwind: React.FC = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [current, setCurrent] = useState<string>("aboutme");

  // const handleNavigation = (path: string, name: string) => {
  //   setCurrent(name); // Update the active state
  //   navigate(path); // Navigate to the route
  // };

  const [clikcEvent, setClickEvent] = useState(false);
  const { authUser, setAuthUser, userId, setUserId } = useAuth();

  // const navigation = [
  //   { name: "AboutMe", href: "/aboutme", current: "aboutme" },
  //   { name: "Todolist", href: "/", current: "todolist" },
  //   // { name: "Next Project", href: "/next", current: undefined },
  // ];

  console.log(current);

  useEffect(() => {
    //setCurrentTodolist(currentTodolist);

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
        // navigate("/");
      }
    });
  }, [setAuthUser]);

  const userSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  //fnfnxc@mailsac.com
  //123456

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  // key={item.name}
                  // href="/aboutme"
                  // aria-current={item.current ? "page" : undefined}
                  onClick={() => setCurrent("aboutme")}
                  className={classNames(
                    current === "aboutme"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-lg font-medium"
                  )}
                >
                  AboutMe
                </Link>
                <Link
                  to="/todolist"
                  onClick={() => setCurrent("todolist")}
                  // key={item.name}
                  // href="/"
                  // aria-current={item.current ? "page" : undefined}
                  // onClick={() => handleNavigation("/", "todolist")}
                  className={classNames(
                    current === "todolist"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-lg font-medium"
                  )}
                >
                  Todolist
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            <button
              type="button"
              className="relative  p-1 text-white     focus:ring-offset-2 hover:text-gray-400"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-5 w-5 sm:w-8 sm:h-8 " />
            </button>

            {/* Profile dropdown */}
            {!user ? (
              <Menu as="div" className="relative ml-3 ">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white dark:text-white hover:text-gray-400"
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
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {/* <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full md:h-10 md:w-16"
                  /> */}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Signup
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white dark:text-white hover:text-gray-400"
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
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {/* <img
                      alt=""
                      src={user.photoURL || "/default-avatar.png"}
                      className="h-8 w-8 rounded-full"
                    /> */}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-54 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="flex-col justify-center px-4 py-2 text-sm md:text-lg text-gray-700 data-[focus]:bg-gray-100">
                    <p className=" text-center">Signed In as</p>
                    <p className=" font-semibold">{user.email}</p>
                  </div>

                  <MenuItem>
                    <Link
                      to="/"
                      className="flex justify-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      onClick={userSignout}
                    >
                      LogOut
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel> */}

      {/*  */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton
            as={Link}
            to="/"
            onClick={() => setCurrent("aboutme")}
            className={classNames(
              current === "aboutme"
                ? "bg-gray-900 text-white  w-24"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            AboutMe
          </DisclosureButton>
          <DisclosureButton
            as={Link}
            to="/todolist"
            onClick={() => setCurrent("todolist")}
            className={classNames(
              current === "todolist"
                ? "bg-gray-900 text-white  w-24"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            Todolist
          </DisclosureButton>
        </div>
      </DisclosurePanel>
      {/*  */}
    </Disclosure>
  );
};

export default HeaderTailwind;
