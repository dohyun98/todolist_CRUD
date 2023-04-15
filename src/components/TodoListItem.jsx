import axios from 'axios';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const List = styled.div`
  display: flex;
  align-items: center;
  .checkbox {
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .text {
    display: flex;
  }
  botton {
  }
`;
const TodoListItem = ({ todo, onCheck, onEdit, todos, setTodos }) => {
  const { id, value, isDone } = todo;

  const onRemove = useCallback(
    () => {
      axios
        .delete(`http://localhost:3001/todos/${id}`)
        // .then : UI상에서만 임시로 데이터 보여주기.
        .then((response) => {
          console.log(response);
          const newTodos = todos.filter((el) => id !== el.id);
          setTodos(newTodos);
        })
        .catch((err) => console.log(Error));
    },
    [id], // 의존성 배열
  );

  return (
    <List>
      <input type="checkbox" checked={isDone} onChange={(e) => onCheck(id, e)} />
      <div className="text">{value}</div>
      <button onClick={() => onRemove(id)}>X</button>
      <button onClick={() => onEdit(id)}>edit</button>
    </List>
  );
};

export default TodoListItem;
