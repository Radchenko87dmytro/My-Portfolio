import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* {user ? ( */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-4">
          <img
            // src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="h-16 w-16 rounded-full object-cover mb-2"
          />
          <p className="text-sm text-gray-500">Signed in as</p>
          {/* <p className="text-base font-semibold text-gray-800">{user.email}</p> */}
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 w-32 text-lg"
          // onClick={userSignout}
        >
          Sign Out
        </button>
      </div>
      {/* ) : ( */}
      <div className="flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-lg">
            <a href="/login">Login</a>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 text-lg">
            <a href="/signup">Signup</a>
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
