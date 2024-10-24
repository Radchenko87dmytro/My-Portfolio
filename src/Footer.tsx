import React from "react";

const Footer = () => {
  return (
    <footer className=" flex bg-gray-800 text-white py-10">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row ">
        {/* Left Section - Description */}
        <div className=" mb-4 md:mb-0 flex justify-around xl:ml-10 2xl:ml-9">
          {/* sm:text-xs md:text-xl lg:text-2xl xl:text-3xl */}
          <p className="flex text-center md:text-left text-xs sm:text-sm md:text-lg lg:text-xl">
            © {new Date().getFullYear()} Todolist Project. All rights reserved.
          </p>
        </div>

        {/* Right Section - Social Links */}
        <div className="flex justify-around space-x-6 md:mr-14 xl:mr-10 2xl:mr-9">
          {/* GitHub Link */}
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
              alt="GitHub"
              className="w-6 h-6 transition-transform duration-300 hover:scale-150"
            />
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com/in/your-linkedin-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/linkedin.png"
              alt="LinkedIn"
              className="w-6 h-6 transition-transform duration-300 hover:scale-150"
            />
          </a>

          {/* Icons8 Link */}
          <a
            href="https://icons8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/icons8-new-logo.png"
              alt="Icons8"
              className="w-6 h-6 transition-transform duration-300 hover:scale-150"
            />
          </a>

          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 flex items-center"
          >
            <img
              src="https://img.icons8.com/?size=100&id=4PiNHtUJVbLs&format=png&color=000000"
              alt="Tailwind CSS"
              className="w-6 h-6 filter invert transition-transform duration-300 hover:scale-150"
            />
          </a>

          {/* ChatGPT Link */}
          <a
            href="https://chat.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="ChatGPT"
              className="w-6 h-6 transition-transform duration-300 hover:scale-150"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
