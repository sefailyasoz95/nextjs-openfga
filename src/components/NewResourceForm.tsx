"use client";

import { useResourceStore } from "@/hooks/useResourceStore";
import { useState } from "react";

export default function NewResourceForm() {
	const { addResource } = useResourceStore();
	const [name, setName] = useState("");
	const [type, setType] = useState<"admin_restricted" | "user_restricted">("admin_restricted");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const id = `folder:${name.toLowerCase().replace(/\s+/g, "-")}`;

		addResource({
			id,
			name,
			type,
		});

		setName("");
		setType("admin_restricted");
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4 mt-4'>
			<input
				type='text'
				placeholder='New folder name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				className='border rounded p-2 w-full'
			/>
			<select
				value={type}
				onChange={(e) => setType(e.target.value as "admin_restricted" | "user_restricted")}
				className='border rounded p-2 w-full'>
				<option value='admin_restricted'>Admin Restricted</option>
				<option value='user_restricted'>User Restricted</option>
			</select>
			<button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>
				Add Resource
			</button>
		</form>
	);
}
