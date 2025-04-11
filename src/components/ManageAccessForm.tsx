"use client";

import { useState } from "react";

export default function ManageAccessForm() {
	const [user, setUser] = useState("");
	const [resource, setResource] = useState("");
	const [role, setRole] = useState("viewer");

	const handleAssign = () => {
		alert(`Assigned ${role} role to ${user} on ${resource}`);
		// In future step: Call OpenFGA client here
	};

	return (
		<div className='bg-white p-6 rounded-2xl shadow-md mt-6 max-w-xl'>
			<h2 className='text-xl font-semibold mb-4'>Manage Access</h2>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm mb-1'>Select User</label>
					<input
						type='text'
						placeholder='e.g. user:alice'
						className='w-full p-2 rounded border'
						value={user}
						onChange={(e) => setUser(e.target.value)}
					/>
				</div>
				<div>
					<label className='block text-sm mb-1'>Select Resource</label>
					<input
						type='text'
						placeholder='e.g. folder:finance'
						className='w-full p-2 rounded border'
						value={resource}
						onChange={(e) => setResource(e.target.value)}
					/>
				</div>
				<div>
					<label className='block text-sm mb-1'>Role</label>
					<select className='w-full p-2 rounded border' value={role} onChange={(e) => setRole(e.target.value)}>
						<option value='owner'>Owner</option>
						<option value='viewer'>Viewer</option>
						<option value='member'>Member</option>
					</select>
				</div>
				<button
					className='bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition'
					onClick={handleAssign}>
					Apply
				</button>
			</div>
		</div>
	);
}
