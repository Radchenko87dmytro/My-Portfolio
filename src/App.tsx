import { useEffect, useState } from "react";
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
  const [tasks, setTasks] = useState<Array<TaskType>>(
    // localStorage.getItem("todoListTasks")
    //   ? JSON.parse(localStorage.getItem("todoListTasks") || "[]")
    //   :
    []
  );

  // const fetchTasks = async (userId: any) => {
  //   const q = query(collection(db, "tasks"), where("userId", "==", userId));
  //   const querySnapshot = await getDocs(q);
  //   const userTasks: any = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setTasks(userTasks);
  // };
  //fetchTasks()

  console.log(tasks);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    let newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    //localStorage.setItem("todoListTasks", JSON.stringify(newTasks));
  }

  const addTask = async (title: string) => {
    let newTask = { id: Date.now(), title: title, isDone: false };
    console.log(Date.now());
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    try {
      const docRef = await addDoc(collection(db, "tasks"), { ...newTask });
      setTasks([...tasks, { ...newTask, id: docRef.id }]);
    } catch (e) {
      console.error("Error adding task: ", e);
    }

    //localStorage.setItem("todoListTasks", JSON.stringify(newTasks));
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

  const changeStatus = (id: number, isDone: boolean) => {
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
    //localStorage.setItem("todoListTasks", JSON.stringify([...tasks]));
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
      />
      <div className="links">
        <a href="https://icons8.com" target="_blank">
          icons8.com
        </a>
      </div>
    </div>
  );
};

export default App;
