'use server';
import { todoInsertSchema, todoTable } from '@/db/schema';
import { database } from '@/db';

interface Todo {
	id: string;
	title: string;
	description?: string;
}

interface ActionFormData {
	title: string;
	description?: string;
}

interface ActionResponse {
	success: boolean;
	todo?: Todo;
	message?: string;
	errors?: {
		/* eslint-disable no-unused-vars */
		[K in keyof ActionFormData]?: string[];
	};
}

export async function createTodo(
	_: ActionResponse | null,
	formData: FormData
): Promise<ActionResponse> {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	try {
		const rawData: ActionFormData = {
			title: formData.get('title') as string,
			description: formData.get('description') as string,
		};

		// Validate the form data
		const result = todoInsertSchema.safeParse(rawData);

		if (!result.success) {
			return {
				success: false,
				message: 'Please fix the errors in the form',
				errors: result.error.flatten().fieldErrors,
			};
		}

		const newTodos = await database
			.insert(todoTable)
			.values(result.data)
			.returning();

		return {
			success: true,
			todo: newTodos[0],
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occurred while creating the todo',
		};
	}
}
