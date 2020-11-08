import React, { ChangeEvent } from 'react';
import { useTodo } from '../contexts/todoContext';
import { Todo } from '../pages/api/todo';

const TodoItem = (props: { todo: Todo }) => {
	const { todo } = props;
	const { updateTodo, deleteTodo } = useTodo();

	const toggleTodo = (event: ChangeEvent<HTMLInputElement>) => {
		updateTodo({
			...todo,
			fields: {
				...todo.fields,
				completed: !todo.fields.completed,
			},
		});
		// event.target.value
		// console.log({ todo });
	};

	const onDelete = () => {
		deleteTodo(todo);
	};

	return (
		<li className='flex list-none content-center bg-white items-center shadow-lg rounded-lg my-2 py-2 px-4'>
			<input className='form-checkbox mr-2 h-5 w-5' type='checkbox' name='completed' id='completed' checked={todo.fields.completed} onChange={toggleTodo} />
			<p className={`flex-1 text-gray-800 hover:text-red-500 ${todo.fields.completed && 'line-through'}`}>{todo.fields.description}</p>
			<button className='bg-red-500 hover:bg-red-600 text-sm text-white px-2 py-1 rounded shadow-lg' onClick={onDelete}>
				Delete
			</button>
		</li>
	);
};

export default TodoItem;
