import { Todo } from "../common/types";

const getSavedTodos = (): Todo[] => {
  const savedTodosString = localStorage.getItem("todos");

  if (savedTodosString) {
    const savedTodosJSON = JSON.parse(savedTodosString) as Todo[];

    if (savedTodosJSON) return savedTodosJSON;
  }

  return [];
};

export { getSavedTodos };
