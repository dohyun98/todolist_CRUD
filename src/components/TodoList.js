import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((data) => setTodos(data.data));
  }, []);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value) {
        return;
      }
      const data = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        value: value,
        isDone: false,
      };
      axios.post(`http://localhost:3001/todos`, data).then((response) => {
        setTodos([...todos, response.data]);
      });
      setValue("");
    },
    [value, todos]
  );

  const onRemove = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:3001/todos/${id}`)
        // .then : UI상에서만 임시로 데이터 보여주기.
        .then((response) => {
          const newTodos = todos.filter((el) => id !== el.id);
          setTodos(newTodos);
        })
        .catch((err) => console.log(Error));
    },
    [todos]
  );

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
      <form onSubmit={onSubmit}>
        <input
          placeholder="할 일을 입력하세요"
          onChange={onChange}
          value={value}
        />
        <button type="submit">add</button>
      </form>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onCheck={onCheck}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
