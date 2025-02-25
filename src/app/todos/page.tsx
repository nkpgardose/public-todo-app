import type { Metadata } from 'next';
import Todos from '@/components/Todos';
import { database } from '@/db';
import { todoTable } from '@/db/schema';

export const metadata: Metadata = {
	title: "Everyone's Todo",
	description: 'Home page of the public todo app',
};

export default async function TodosPage() {
	const todos = await database
		.select({
			id: todoTable.id,
			title: todoTable.title,
			description: todoTable.description,
		})
		.from(todoTable);

	return (
		<section>
			<h1>Welcome to Everyone&apos;s Todo</h1>
			<p>This is a simple todo app for everyone.</p>
			<Todos todos={todos} />
		</section>
	);
}
