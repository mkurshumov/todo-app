import { useEffect, useState } from "react";
import { Todo, TodoProps } from "./common/types";
import { Card, AddTodo, TodoList } from "./components";
import { getSavedTodos } from "./utils/localStorage";

export default function App() {
  const savedTodos = getSavedTodos();
  const [todos, setTodos] = useState<Todo[]>(savedTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const todoProps: TodoProps = {
    todos,
    setTodos,
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-7">
        <Card>
          <p className="mb-2 text-2xl">ToDo App</p>
          <AddTodo {...todoProps} />

          <TodoList {...todoProps} />
        </Card>
      </div>
    </>
  );
}
