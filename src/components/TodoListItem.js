import axios from "axios";
import React, { useCallback } from "react";
const TodoListItem = ({ todo, onCheck, onEdit, setTodos }) => {
  const { id, value, isDone } = todo;

  const onRemove = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:3001/todos/${id}`)
        // .then : UI상에서만 임시로 데이터 보여주기.
        .then((response) => {
          const newTodos = todo.filter((el) => id !== el.id);
          setTodos(newTodos);
        })
        .catch((err) => console.log(Error));
    },
    [todo]
  );

  return (
    <div className="TodoListItem">
      <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => onCheck(id, e)}
      />
      <div className="text">{value}</div>
      <button onClick={() => onRemove(id)}>X</button>
      <button onClick={() => onEdit(id)}>edit</button>
    </div>
  );
};

export default TodoListItem;
