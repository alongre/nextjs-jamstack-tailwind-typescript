import Head from 'next/head';
import Navbar from '../components/Navbar';
import { table, getMinifyRecords } from './api/utils/airtable';
import styles from '../styles/Home.module.css';
import TodoItem from '../components/TodoItem';
import { useContext, useEffect } from 'react';
import { useTodo } from '../contexts/todoContext';
import { Todo } from './api/todo';

export default function Home(props: { todos: Todo[] }) {
	const { todos, setTodos, updateTodo } = useTodo();

	useEffect(() => {
		setTodos(props.todos);
	}, [props.todos]);

	return (
		<div>
			<Head>
				<title>Autenticated Todo App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto max-w-xl'>
				<Navbar />
				<h1 className='text-4xl font-bold'>Todo App</h1>
				{todos &&
					todos.map((todo) => (
						<ul>
							<TodoItem key={todo.id} todo={todo} />
						</ul>
					))}
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const records = await table.select({}).firstPage();
	const minifiedRecords = getMinifyRecords(records);
	// console.log({ minifiedRecords });

	return {
		props: {
			todos: minifiedRecords,
		},
	};
}
