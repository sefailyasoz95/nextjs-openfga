// components/TodoList.tsx
"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
};

type TodoListProps = {
	resourceId: string; // e.g., "finance_folder"
};

export default function TodoList({ resourceId }: TodoListProps) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState("");

	const storageKey = `todos-${resourceId}`;

	useEffect(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			setTodos(JSON.parse(saved));
		}
	}, [storageKey]);

	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(todos));
	}, [todos, storageKey]);

	const addTodo = () => {
		if (!input.trim()) return;
		const newTodo: Todo = {
			id: Date.now().toString(),
			text: input,
			completed: false,
		};
		setTodos((prev) => [...prev, newTodo]);
		setInput("");
	};

	const toggleTodo = (id: string) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const deleteTodo = (id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<div className='p-4 bg-gray-50 rounded-2xl shadow-md'>
			<h3 className='text-lg font-semibold mb-2'>Todo List for {resourceId}</h3>
			<div className='flex gap-2 mb-4'>
				<input
					className='flex-1 p-2 rounded border'
					placeholder='Add a task...'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button className='bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600' onClick={addTodo}>
					<Plus size={18} />
				</button>
			</div>

			<ul className='space-y-2'>
				{todos.map((todo) => (
					<li
						key={todo.id}
						className={`flex items-center justify-between p-2 rounded ${
							todo.completed ? "bg-green-100" : "bg-white border"
						}`}>
						<span
							className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
							onClick={() => toggleTodo(todo.id)}>
							{todo.text}
						</span>
						<button onClick={() => deleteTodo(todo.id)}>
							<Trash2 size={16} className='text-red-500 hover:text-red-700' />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
