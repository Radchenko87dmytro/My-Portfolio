import { useEffect, useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./components/Todolist/Todolist";

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
import Footer from "./components/Footer";
import { User } from "firebase/auth";
import Header from "./components/Header";
import HeaderTailwind from "./components/HeaderTailwind";
export type FilterValuesType = "all" | "completed" | "active";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  console.log(authUser);

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
      <HeaderTailwind setAuthUser={setAuthUser} setUserId={setUserId} />
      {/* <Header setAuthUser={setAuthUser} setUserId={setUserId} /> */}
      <Todolist
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
        setUserId={setUserId} // Pass the function to set user ID
        authUser={authUser}
      />
      <Footer />
    </div>
  );
};

export default App;
