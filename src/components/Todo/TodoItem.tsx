import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconType, KeyType, Todo, TodoItemProps } from "../../types";
import { Icon } from "../Icon";
import { onKeyDown } from "../../utils/utils";

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

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown(e.key, KeyType.Enter, saveEdit, todo, editTodo);
    onKeyDown(e.key, KeyType.Escape, toggleEdit);
  };

  return (
    <>
      <li className="mb-1 flex items-center justify-between rounded-md bg-white/30 hover:bg-white/10">
        {todo.edit ? (
          <>
            <input
              required
              autoFocus
              type="text"
              placeholder="Todo description"
              className="my-2 ml-2 flex-1 rounded-md py-1 pl-[25px] pr-2 outline-none ring-inset valid:ring-2 valid:ring-green-500 invalid:ring-2 invalid:ring-pink-500"
              value={editTodo.description}
              onChange={updateEditTodo}
              onKeyDown={handleKeyDown}
            />

            <div className="p-2">
              <button
                disabled={!editTodo.description}
                type="button"
                onClick={() => saveEdit(todo, editTodo)}
                title="save"
                className="mr-1 disabled:cursor-not-allowed"
              >
                <Icon
                  type={IconType.save}
                  className={
                    "h-4 w-4 stroke-white " +
                    (editTodo.description ? "hover:stroke-slate-700" : "")
                  }
                />
              </button>
              <button type="button" onClick={toggleEdit} title="cancel">
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
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.description}
            </label>

            <div className="p-2">
              <button
                type="button"
                onClick={() => toggleEdit(todo.id, setEditTodo)}
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
