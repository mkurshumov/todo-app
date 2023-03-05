export const defaultTodo = {
  id: "",
  description: "",
  done: false,
  edit: false,
};

export interface Todo {
  id: string;
  description: string;
  done: boolean;
  edit: boolean;
}

export interface TodoProps {
  todos: Todo[];
  setTodos: any;
}

export interface TodoItemProps extends TodoProps {
  todo: Todo;
}

export enum IconType {
  edit,
  remove,
  save,
  cancel,
}

export interface IconProps {
  type: IconType;
  className?: string;
  strokeWidth?: number;
}
