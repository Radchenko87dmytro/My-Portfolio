import { useEffect, useState } from "react";
import "./AppHeader.css";
import { Todolist, TaskType } from "./Todolist";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type FilterValuesType = "all" | "completed" | "active";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const fetchTasks = async (userId: string) => {
    if (db) {
      // Query tasks for the specific user
      const q = query(collection(db, "tasks"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("snapshot", snapshot);
        const userTasks: TaskType[] = snapshot.docs.map((doc) => ({
          id: doc.id, // Use Firestore document ID
          ...doc.data(),
        })) as TaskType[];

        setTasks(userTasks);
      });
      return unsubscribe; // Cleanup listener on unmount
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTasks(userId);
    }
  }, [userId]);

  const removeTask = async (id: string) => {
    let newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    //localStorage.setItem("todoListTasks", JSON.stringify(newTasks));

    // Remove task from Firestore
    try {
      const taskDocRef = doc(db, "tasks", id); // Reference the Firestore document by its ID
      deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Error removing task: ", error);
    }
  };

  //localStorage.setItem("todoListTasks", JSON.stringify(newTasks));
  // };

  const addTask = async (title: string) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title,
        isDone: false,
        createdAt: new Date(),
      });
      console.log(docRef.id);
      const newTask: TaskType = { id: docRef.id, title, isDone: false };

      setTasks([...tasks, newTask]);
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => !t.isDone);
  }

  const changeStatus = async (id: string, isDone: boolean) => {
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
    //localStorage.setItem("todoListTasks", JSON.stringify([...tasks]));
    // Update the task's status in Firestore
    try {
      const taskDocRef = doc(db, "tasks", id); // Reference to the Firestore document by its ID
      await updateDoc(taskDocRef, {
        isDone: isDone, // Update the isDone field in Firestore
      });
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  return (
    <div className="App">
      <Todolist
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
        setUserId={setUserId} // Pass the function to set user ID
      />

      <footer className="links flex bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-col items-center justify-between md:flex-row ">
          {/* Left Section - Description */}
          <div className=" mb-4 md:mb-0 flex justify-around ">
            {/* sm:text-xs md:text-xl lg:text-2xl xl:text-3xl */}
            <p className="flex text-center md:text-left text-base sm:text-xs md:text-xl lg:text-xl ">
              © {new Date().getFullYear()} Todolist Project. All rights
              reserved.
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
                className="w-6 h-6 mr-2 filter invert transition-transform duration-300 hover:scale-150"
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
    </div>
  );
};

export default App;
