import axios from "axios";
import React from "react";
const TodoListItem = ({ todo, onRemove, onCheck, onEdit }) => {
  const { id, value, isDone } = todo;

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
