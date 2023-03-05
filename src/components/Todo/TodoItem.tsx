import { ChangeEvent, useState } from "react";
import { defaultTodo, IconType, Todo, TodoItemProps } from "../../common/types";
import { Icon } from "../Icon";

export const TodoItem = ({ todo, todos, setTodos }: TodoItemProps) => {
  const [editTodo, setEditTodo] = useState<Todo>(defaultTodo);

  let newTodos = [];

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const toggleTodo = (isChecked: boolean, id: string) => {
    newTodos = todos.map((todo: Todo) => {
      if (todo.id === id) todo.done = isChecked;

      return todo;
    });

    setTodos(newTodos);
  };

  const toggleEdit = (todo?: Todo) => {
    newTodos = todos.map((t: Todo) => {
      //close all
      t.edit = false;

      if (todo && todo.id === t.id) {
        //open edit
        t.edit = true;
        //save edit todo
        setEditTodo(t);
      }

      return t;
    });

    setTodos(newTodos);
  };

  const updateEditTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTodo({ ...editTodo, description: e.target.value });
  };

  const saveEdit = (todo: Todo) => {
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

  return (
    <>
      <li className="mb-1 flex items-center justify-between rounded-md bg-white/30 hover:bg-white/10">
        {todo.edit ? (
          <>
            <input
              type="text"
              placeholder="Todo description"
              className="my-2 ml-2 flex-1 rounded-md py-1 pl-[25px] pr-2"
              value={editTodo.description}
              onChange={updateEditTodo}
            />

            <div className="p-2">
              <button
                onClick={() => saveEdit(todo)}
                title="save"
                className="mr-1"
              >
                <Icon type={IconType.save} />
              </button>
              <button onClick={() => toggleEdit()} title="cancel">
                <Icon type={IconType.cancel} />
              </button>
            </div>
          </>
        ) : (
          <>
            <label
              className={
                "flex-1 break-all p-3 hover:cursor-pointer" +
                (todo.done ? " line-through" : "")
              }
            >
              <input
                className="mr-2 hover:cursor-pointer"
                type="checkbox"
                name="todo"
                checked={todo.done}
                onChange={(e) => toggleTodo(e.target.checked, todo.id)}
              />
              {todo.description}
            </label>

            <div className="p-2">
              <button
                onClick={() => toggleEdit(todo)}
                title="edit"
                className="mr-1"
              >
                <Icon type={IconType.edit} />
              </button>
              <button onClick={() => removeTodo(todo.id)} title="remove">
                <Icon type={IconType.remove} />
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
};
