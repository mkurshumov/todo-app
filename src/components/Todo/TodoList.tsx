import { useMemo, useState } from "react";
import { IconType, Todo, TodoProps } from "../../common/types";
import { Icon } from "../Icon";
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

  //cache filtered todos until todos or filter changes
  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter]
  );
  const todoTodosCount = useMemo(
    () => getFilteredTodos(todos, FilterType.todo).length,
    [todos, filter]
  );
  const doneTodosCount = useMemo(
    () => getFilteredTodos(todos, FilterType.done).length,
    [todos, filter]
  );

  let newTodos = [];

  const saveEdit = (todo: Todo, editTodo: Todo) => {
    newTodos = todos.map((t: Todo) => {
      if (todo.edit && todo.id === t.id) {
        t = { ...editTodo };
      }

      // close all
      t.edit = false;

      return t;
    });

    setTodos(newTodos);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const toggleTodo = (id: string, isChecked: boolean) => {
    newTodos = todos.map((todo: Todo) => {
      if (todo.id === id) todo.done = isChecked;

      return todo;
    });

    setTodos(newTodos);
  };

  const toggleEdit = (id?: string, setEditTodo?: any) => {
    newTodos = todos.map((t: Todo) => {
      //close all
      t.edit = false;

      if (id && id === t.id) {
        //open edit
        t.edit = true;

        setEditTodo(t);
      }

      return t;
    });

    setTodos(newTodos);
  };

  const todoItemProps = {
    saveEdit,
    removeTodo,
    toggleTodo,
    toggleEdit,
  };

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

      {todos.length > 0 && (
        <div className="flex w-80 justify-end pt-2 text-white">
          <button
            type="button"
            title="remove all"
            onClick={() => setTodos([])}
            className="flex rounded-md border p-1 px-2 text-white hover:bg-purple-700"
          >
            <Icon type={IconType.remove} className="h-5 w-5 stroke-white" /> all
          </button>
        </div>
      )}

      <ul className="w-[350px] overflow-auto py-2 px-4 sm:w-[500px]">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...todoItemProps} />
        ))}
      </ul>
    </>
  );
};
