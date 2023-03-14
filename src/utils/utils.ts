import { KeyType, Todo } from "../types";

const getSavedTodos = (): Todo[] => {
  const savedTodosString = localStorage.getItem("todos");

  if (savedTodosString) {
    const savedTodosJSON = JSON.parse(savedTodosString) as Todo[];

    if (savedTodosJSON) return savedTodosJSON;
  }

  return [];
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
