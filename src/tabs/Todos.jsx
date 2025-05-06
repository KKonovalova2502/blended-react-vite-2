import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = window.localStorage.getItem('saved-todos');
    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    window.localStorage.setItem('saved-todos', JSON.stringify(todos));
  }, [todos]);

  const findTodo = text => {
    return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
  };

  const addNewTodo = inputValue => {
    if (findTodo(inputValue.text)) {
      alert('This todo already exists!');
      return;
    }
    setTodos(prev => {
      return [...prev, inputValue];
    });
  };

  const delTodo = todoId => {
    setTodos(prev => {
      return prev.filter(todo => todo.id !== todoId);
    });
  };

  const handleEditTodo = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleUpdateTodo = updatedText => {
    if (findTodo(updatedText)) {
      alert('This todo already exists!');
      return;
    }
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === currentTodo.id ? { ...todo, text: updatedText } : todo
      )
    );

    setIsEditing(false);
    setCurrentTodo({});
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          key={currentTodo.id}
          defaultValue={currentTodo.text}
          updateTodo={handleUpdateTodo}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <Form onSubmit={addNewTodo} />
      )}

      {todos.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList todos={todos} onDelete={delTodo} onEdit={handleEditTodo} />
      )}
    </>
  );
};

export default Todos;
