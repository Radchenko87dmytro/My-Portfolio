function sum(a: number, b: number) {
  alert(a + b);
}

//sum(12, 14);

export interface TaskType {
  id: number;
  title: string;
  isDone: boolean;
}

interface PropsType {
  title: string;
  tasks: Array<TaskType>;
}

export function Todolist(props: PropsType) {
  // props = {title: "What to learn", tasks: []}
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((i) => {
          return (
            <li key={i.id}>
              <input type={"checkbox"} checked={i.isDone} />
              <span>{i.title}</span>
              <button
                onClick={() => {
                  alert(i.id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}
