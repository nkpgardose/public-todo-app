'use client';

import Link from 'next/link';
import { useState, useEffect, useActionState } from 'react';
import { createTodo } from '@/actions/todos';

export interface Todo {
	id: string;
	title: string;
	description?: string;
}

interface TodosProps {
	todos: Todo[];
}

function Todos({ todos }: TodosProps) {
	const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
	const [state, action, isPending] = useActionState(createTodo, {
		success: false,
	});

	useEffect(() => {
		if (state.success) {
			console.log('Todo created successfully');
			setCurrentTodos([...currentTodos, state.todo!]);
		}
	}, [state]);

	return (
		<div>
			<h1>Add your todo</h1>
			<form action={action}>
				<label htmlFor="title">Todo title</label>
				<br />
				<input
					id="title"
					name="title"
					type="text"
					placeholder="Add a todo title"
				/>
				<br />
				<label htmlFor="description">Description</label>
				<br />
				<textarea
					id="description"
					name="description"
					placeholder="Add a todo description"
				/>
				<br />
				<button type="submit">Add</button>
				{isPending && <div>Saving todo...</div>}
			</form>

			<h2>Todos</h2>
			{currentTodos.length ? (
				<table>
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
					<tbody>
						{currentTodos.map((todo) => (
							<tr key={todo.id}>
								<th scope="row">{todo.title}</th>
								<td>{todo.description}</td>
								<td>
									<Link href={`/todos/${todo.id}`}>See more</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</div>
	);
}

export default Todos;
