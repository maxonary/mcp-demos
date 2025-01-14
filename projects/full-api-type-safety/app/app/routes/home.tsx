import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createTodoMutation, getTodosQuery } from "~/lib/data/client";

export default function Home() {
	const [newTodoTitle, setNewTodoTitle] = useState("");

	const getTodos = useQuery({
		queryKey: ["todos"],
		queryFn: getTodosQuery,
	});

	const createTodo = useMutation({
		mutationFn: (title: string) => createTodoMutation(title),
		onSuccess: () => {
			getTodos.refetch();
			setNewTodoTitle("");
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodoTitle.trim()) {
			createTodo.mutate(newTodoTitle);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-4 text-red-900">
			<h1 className="text-2xl font-bold mb-6">Todo List</h1>

			<form onSubmit={handleSubmit} className="mb-8">
				<div className="flex gap-2">
					<input
						type="text"
						value={newTodoTitle}
						onChange={(e) => setNewTodoTitle(e.target.value)}
						className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Add a new todo..."
					/>
					<button
						type="submit"
						disabled={createTodo.isPending}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
					>
						Add
					</button>
				</div>
			</form>

			{getTodos.isLoading && <p className="text-gray-500">Loading todos...</p>}
			{getTodos.isError && <p className="text-red-500">Error loading todos</p>}

			<ul className="space-y-2">
				{getTodos.data?.map((todo) => (
					<li
						key={todo.id}
						className="p-3 bg-white shadow rounded-lg flex items-center"
					>
						<span
							className={todo.completed ? "line-through text-gray-500" : ""}
						>
							{todo.title}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
