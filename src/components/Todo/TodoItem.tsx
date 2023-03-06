import { ChangeEvent, useState } from "react";
import { IconType, Todo, TodoItemProps } from "../../common/types";
import { Icon } from "../Icon";

export const TodoItem = ({
  todo,
  saveEdit,
  removeTodo,
  toggleTodo,
  toggleEdit,
}: TodoItemProps) => {
  const [editTodo, setEditTodo] = useState<Todo>(todo);

  const updateEditTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTodo({ ...editTodo, description: e.target.value });
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
                type="button"
                onClick={() => saveEdit(todo, editTodo)}
                title="save"
                className="mr-1"
              >
                <Icon type={IconType.save} />
              </button>
              <button type="button" onClick={() => toggleEdit()} title="cancel">
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
                type="button"
                onClick={() => toggleEdit(todo)}
                title="edit"
                className="mr-1"
              >
                <Icon type={IconType.edit} />
              </button>
              <button
                type="button"
                onClick={() => removeTodo(todo.id)}
                title="remove"
              >
                <Icon type={IconType.remove} />
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
};
