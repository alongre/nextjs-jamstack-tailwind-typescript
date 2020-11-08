import { NextApiResponse } from 'next';
import { createContext, useState, useContext } from 'react';
import { Todo } from '../pages/api/todo';
import { httpRequest, http } from '../pages/api/utils/http';
import TodoItem from '../components/TodoItem';

const TodoContext = createContext(undefined);

const TodoProvider: React.FC = (props) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	return (
		<TodoContext.Provider
			value={{
				todos,
				setTodos,
				// refreshTodos,
				// updateTodo,
				// deleteTodo,
				// addTodo,
			}}
		>
			{props.children}
		</TodoContext.Provider>
	);
};

const useTodo = () => {
	const { todos, setTodos } = useContext(TodoContext);

	const refreshTodos = async () => {
		try {
			const latestsTodos = await http<Todo[]>('/api/getTodos');
			setTodos(latestsTodos);
		} catch (err) {
			console.log(err);
		}
	};

	const addTodo = async (description: string) => {
		try {
			const newTodo = await http<Todo>('/api/createTodo', {
				method: 'POST',
				body: JSON.stringify({ description }),
				headers: { 'Content-Type': 'application/json' },
			});
			setTodos((prevTodos) => [newTodo, ...prevTodos]);
		} catch (error) {
			console.log(error);
		}
	};

	const updateTodo = async (updateTodo: Todo) => {
		try {
			const updatedTodo = await http<Todo>('/api/updateTodo', {
				method: 'PUT',
				body: JSON.stringify(updateTodo),
				headers: { 'Content-Type': 'application/json' },
			});
			setTodos((prevTodos) => {
				const existingTodos = [...prevTodos];
				const todo = existingTodos.find((item) => item.id === updateTodo.id);
				todo.fields = updateTodo.fields;
				return existingTodos;
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (todo: Todo) => {
		try {
			const updatedTodo = await http<Todo>('/api/deleteTodo', {
				method: 'DELETE',
				body: JSON.stringify(todo.id),
				headers: { 'Content-Type': 'application/json' },
			});
			setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
		} catch (error) {
			console.log(error);
		}
	};

	return { todos, setTodos, deleteTodo, updateTodo, addTodo, refreshTodos };
};

export { TodoProvider, useTodo };
