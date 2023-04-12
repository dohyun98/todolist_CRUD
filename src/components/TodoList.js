import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import TodoListItem from "./TodoListItem";
import TodoInsert from "./TodoIsert";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((data) => setTodos(data.data));
  }, []);

  const onCheck = useCallback(
    (id, e) => {
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
    },
    [todos]
  );

  const onEdit = useCallback(
    (id, e) => {
      axios
        .patch(`http://localhost:3001/todos/${id}`, {
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
    },
    [todos]
  );

  return (
    <div>
      <TodoInsert todos={todos} setTodos={setTodos} />
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          setTodos={setTodos}
          key={todo.id}
          onCheck={onCheck}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
