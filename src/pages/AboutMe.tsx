import React, { useState } from "react";
import "./AboutMe.css";
import HeaderTailwind from "../components/HeaderTailwind";
import { User } from "firebase/auth";
import Footer from "../components/Footer";

const AboutMe = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  return (
    <div className="aboutMe">
      {/* <HeaderTailwind
        setAuthUser={setAuthUser}
        setUserId={setUserId}
      ></HeaderTailwind> */}
      <section id="skills" className="containerAbout">
        <div className="about-me">
          <p className="about-me-text">
            I am currently learning web development technologies, and I find
            great enjoyment in creating web pages. Lately, I have been focusing
            on developing web pages using the Scrum methodology, which has
            greatly improved my workflow and project management skills. My
            strong skills include HTML, CSS, JavaScript, TypeScript, GitHub,
            Git, React and using GhatGPT.
          </p>
          <p className="about-me-text">
            I am proficient in HTML and CSS it allowing me to create good
            looking and responsive web designs. My knowledge of JavaScript and
            React let me to build dynamic and interactive web applications.
            Additionally, I am quite familiar in version control using Git and
            GitHub, which helps me manage and collaborate on projects
            effectively.
          </p>
          <p className="about-me-text">
            {" "}
            I am passionate about web development and interested to expand my
            skill set and stay updated with the latest industry trends and best
            practices.
          </p>
        </div>

        <div className="container-item">
          <h2 className="item-text">HTML</h2>
          <div className="item-icon-container">
            <i className="item-icon fa-brands fa-html5"></i>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">CSS</h2>
          <div className="item-icon-container">
            <i className="item-icon fa-brands fa-css3-alt"></i>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">JS</h2>
          <div className="item-icon-container">
            <i className="item-icon fa-brands fa-js"></i>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">React</h2>
          <div className="item-icon-container">
            <i className="item-icon fa-brands fa-react"></i>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">ChatGPT</h2>
          <div className="item-icon-container">
            <svg
              className="item-icon-icons"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="70"
              height="70"
              viewBox="0 0 50 50"
              href="https://icons8.com"
              target="_blank"
              //   rel="noopener noreferrer"
            >
              <path d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.12,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"></path>
            </svg>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">TypeScript</h2>
          <div className="item-icon-container">
            <svg
              className="item-icon-icons"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="70"
              height="70"
              viewBox="0 0 50 50"
              href="https://icons8.com"
              target="_blank"
              //   rel="noopener noreferrer"
            >
              <path d="M 5 4 A 1.0001 1.0001 0 0 0 4 5 L 4 45 A 1.0001 1.0001 0 0 0 5 46 L 45 46 A 1.0001 1.0001 0 0 0 46 45 L 46 5 A 1.0001 1.0001 0 0 0 45 4 L 5 4 z M 6 6 L 44 6 L 44 44 L 6 44 L 6 6 z M 15 23 L 15 26.445312 L 20 26.445312 L 20 42 L 24 42 L 24 26.445312 L 29 26.445312 L 29 23 L 15 23 z M 36.691406 23.009766 C 33.576782 22.997369 30.017578 23.941219 30.017578 28.324219 C 30.017578 34.054219 37.738281 34.055625 37.738281 36.640625 C 37.738281 36.885625 37.842187 38.666016 35.117188 38.666016 C 32.392187 38.666016 30.121094 36.953125 30.121094 36.953125 L 30.121094 41.111328 C 30.121094 41.111328 42.001953 44.954062 42.001953 36.289062 C 42.000953 30.664063 34.208984 30.945391 34.208984 28.150391 C 34.208984 27.067391 34.978375 26.054687 37.109375 26.054688 C 39.240375 26.054688 41.126953 27.3125 41.126953 27.3125 L 41.267578 23.607422 C 41.267578 23.607422 39.113892 23.019408 36.691406 23.009766 z"></path>
            </svg>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">GitHub</h2>
          <div className="item-icon-container">
            <i className="item-icon fa-brands fa-github"></i>
          </div>
        </div>

        <div className="container-item">
          <h2 className="item-text">GIT</h2>
          <div className="item-icon-container">
            <i className="item-icon fa-brands fa-git"></i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
