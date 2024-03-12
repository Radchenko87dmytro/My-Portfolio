import { title } from "process";
import { TodolistType } from "../App";
import { v1 } from "uuid";

type ActionType = {
  type: string;
  [key: string]: any;
};

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.id);
    }
    case "Add-TODOLIST": {
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: "all",
        },
      ];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};
