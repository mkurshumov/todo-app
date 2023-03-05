import { useState } from "react";
import { Todo, TodoProps } from "../../common/types";
import { TodoItem } from "./TodoItem";

enum FilterType {
  all,
  todo,
  done,
}

export const TodoList = ({ todos, setTodos }: TodoProps) => {
  const [filter, setFilter] = useState<FilterType>(FilterType.all);

  const getFilteredTodos = (todos: Todo[], filter: FilterType): Todo[] => {
    switch (filter) {
      case FilterType.all:
        return todos;
      case FilterType.todo:
        return todos.filter((todo) => !todo.done);
      case FilterType.done:
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  const todoTodosCount = getFilteredTodos(todos, FilterType.todo).length;
  const doneTodosCount = getFilteredTodos(todos, FilterType.done).length;

  return (
    <>
      <div className="flex w-80">
        <button
          type="button"
          onClick={() => setFilter(FilterType.all)}
          className={
            "flex flex-1 items-center justify-center rounded-tl-lg border p-2 hover:bg-purple-700" +
            (filter === FilterType.all ? " bg-purple-600" : "")
          }
        >
          All ({todos.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter(FilterType.todo)}
          className={
            "flex flex-1 items-center justify-center border-t border-b p-2 hover:bg-purple-700" +
            (filter === FilterType.todo ? " bg-purple-600" : "")
          }
        >
          Todo ({todoTodosCount})
        </button>
        <button
          type="button"
          onClick={() => setFilter(FilterType.done)}
          className={
            "flex flex-1 items-center justify-center rounded-tr-lg border p-2 hover:bg-purple-700" +
            (filter === FilterType.done ? " bg-purple-600" : "")
          }
        >
          Done ({doneTodosCount})
        </button>
      </div>

      <ul className="w-[350px] overflow-auto py-2 px-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </>
  );
};