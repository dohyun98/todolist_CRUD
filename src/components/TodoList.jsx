import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoListItem from './TodoListItem';
import TodoInsert from './TodoIsert';
import styled from 'styled-components';

const Todo = styled.div`
  width: 400px;
  height: 600px;
  border: solid 1px black;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  overflow: hidden;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/todos').then((data) => setTodos(data.data));
  }, []);

  return (
    <Todo>
      <TodoInsert todos={todos} setTodos={setTodos} />
      {todos.map((todo) => (
        <TodoListItem todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
      ))}
    </Todo>
  );
};

export default TodoList;
