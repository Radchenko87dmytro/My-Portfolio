import React, { useEffect, useState } from "react";
import "./AppHeader.css";
import { Todolist, TaskType } from "./Todolist";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
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

      // Listen for real-time updates
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

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addTask = async (title: string) => {
    const newTask: TaskType = { id: Date.now(), title, isDone: false };
    try {
      await addDoc(collection(db, "tasks"), newTask);
      setTasks([...tasks, newTask]);
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  const changeStatus = (id: number, isDone: boolean) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, isDone } : task))
    );
  };

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone);
  } else if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => !t.isDone);
  }

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
      <div className="links">
        <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">
          icons8.com
        </a>
      </div>
    </div>
  );
};

export default App;
