import React, { useEffect, useRef, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import { Todo } from '../model';
import './styles.css';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((oneTodo) => (oneTodo.id === id ? { ...oneTodo, todo: editTodo } : oneTodo)));

    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  useEffect(() => {
    if (!todo.todo) {
      handleDelete(todo.id);
    }
  }, [todo, handleDelete]);

  return (
    <form className='todos-single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input type='text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos-single-text' ref={inputRef} />
      ) : todo.isDone ? (
        <s className='todos-single-text'>{todo.todo}</s>
      ) : (
        <span className='todos-single-text'>{todo.todo}</span>
      )}
      <div>
        <span
          className='icon'
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
