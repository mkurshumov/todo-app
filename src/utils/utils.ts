import { KeyType, Todo } from "../types";

const getSavedTodos = (): Todo[] => {
  let savedTodos: Todo[] = [];

  const savedTodosString = localStorage.getItem("todos");

  if (savedTodosString) {
    try {
      savedTodos = JSON.parse(savedTodosString) as Todo[];
    } catch (error) {
      console.error("Corrupted data format in storage");
      localStorage.removeItem("todos");
    }
  }

  return savedTodos;
};

const onKeyDown = (
  key: string,
  keyType: KeyType,
  callback: any,
  ...args: any
) => {
  if (key === keyType) callback(...args);
};

export { getSavedTodos, onKeyDown };
