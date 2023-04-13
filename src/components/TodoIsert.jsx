import { useCallback, useState } from 'react';
import axios from 'axios';

const TodoInsert = ({ todos, setTodos }) => {
  const [value, setValue] = useState('');

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
      setValue('');
    },
    [value, todos],
  );

  return (
    <div className="TodoInsert">
      <form onSubmit={onSubmit}>
        <input placeholder="할 일을 입력하세요" onChange={onChange} value={value} />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default TodoInsert;
