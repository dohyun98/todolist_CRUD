import axios from 'axios';
import React from 'react';
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
const TodoListItem = ({ todo, todos, setTodos }) => {
  const { id, value, isDone } = todo;

  const onCheck = (id, e) => {
    axios
      //PUT : 리소스의 모든 것을 업데이트 한다. / PATCH : 리소스의 일부를 업데이트 한다.
      .patch(`http://localhost:3001/todos/${id}`, {
        isDone: e.target.checked,
      })
      .then((response) => {
        const newCheck = todos.map((el) => {
          if (el.id !== id) {
            return el;
          } else {
            return response.data;
          }
        });
        setTodos(newCheck);
      })
      .catch((err) => console.log(Error));
  };

  const onRemove = (id) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      // .then : UI상에서만 임시로 데이터 보여주기.
      .then((response) => {
        const newTodos = todos.filter((el) => id !== el.id);
        setTodos(newTodos);
      })
      .catch((err) => console.log(Error));
  };

  const onEdit = (id, e) => {
    axios
      .put(`http://localhost:3001/todos/${id}`, {
        value: e.target.value,
      })
      .then((response) => {
        const newValue = todos.map((el) => {
          if (el.id !== id) {
            return el;
          } else {
            return response.data;
          }
        });
        setTodos(newValue);
      })
      .catch((err) => console.log(Error));
  };

  return (
    <List>
      <input type="checkbox" checked={isDone} onChange={(e) => onCheck(id, e)} />
      <div className="text">{value}</div>
      <button onClick={() => onRemove(id)}>X</button>
      <button onClick={(e) => onEdit(id, e)}>edit</button>
    </List>
  );
};

export default TodoListItem;
