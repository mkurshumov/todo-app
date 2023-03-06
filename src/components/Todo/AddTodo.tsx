import { ChangeEvent, KeyboardEvent, useState } from "react";
import { defaultTodo, KeyType, Todo, TodoProps } from "../../common/types";
import { onKeyDown } from "../../utils/utils";

export const AddTodo = ({ todos, setTodos }: TodoProps) => {
  const [newTodo, setNewTodo] = useState<Todo>(defaultTodo);

  const addTodo = () => {
    if (newTodo.description) {
      setTodos([
        ...todos,
        {
          ...newTodo,
          id: crypto.randomUUID(),
        },
      ]);
      setNewTodo(defaultTodo);
    }
  };

  const updateNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, description: e.target.value });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown(e.key, KeyType.Enter, addTodo);
  };

  return (
    <>
      <div className="mb-4 flex w-80">
        <input
          type="text"
          placeholder="Todo description"
          className="mr-3 flex-1 rounded-md p-1 px-3"
          value={newTodo.description}
          onChange={updateNewTodo}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addTodo}
          disabled={!newTodo.description}
          className="h-10 w-10 rounded-full bg-purple-600 text-white enabled:hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-75"
        >
          +
        </button>
      </div>
    </>
  );
};
