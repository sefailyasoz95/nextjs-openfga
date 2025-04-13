"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function OpenFGASetupManager() {
	const { storeId, setStoreId } = useAuth();
	const [modelExists, setModelExists] = useState(false);
	const [loading, setLoading] = useState(false);

	// If store exists, check model

	const handleCreateStore = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/setup/create-store", {
				method: "POST",
			});
			if (!res.ok || res.status === 500) {
				alert("Error creating store, make sure you have the OpenFGA server running");
				return;
			}
			const data = await res.json();
			setStoreId(data.storeId);
		} catch (err) {
			console.error("Failed to create store:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateModel = async () => {
		if (!storeId) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/setup/set-auth-model`, {
				method: "POST",
				body: JSON.stringify({
					storeId: storeId,
				}),
			});
			if (res.ok) {
				setModelExists(true);
			} else alert("Error creating model, make sure you have the OpenFGA server running");
		} catch (err) {
			console.error("Failed to create model:", err);
			alert("Failed to create model: " + err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-6 rounded-xl shadow-lg bg-white max-w-xl mx-auto mt-10'>
			<h2 className='text-2xl font-bold mb-4'>OpenFGA Setup Manager</h2>

			{!storeId && (
				<button onClick={handleCreateStore} disabled={loading} className='bg-blue-600 text-white px-4 py-2 rounded-md'>
					{loading ? "Creating Store..." : "Create Store"}
				</button>
			)}

			{storeId && (
				<>
					<div className='mb-4'>
						✅ Store ID: <code>{storeId}</code>
					</div>

					{!modelExists ? (
						<button
							onClick={handleCreateModel}
							disabled={loading}
							className='bg-green-600 text-white px-4 py-2 rounded-md'>
							{loading ? "Creating Model..." : "Create Authorization Model"}
						</button>
					) : (
						<div>✅ Authorization model created.</div>
					)}
				</>
			)}
		</div>
	);
}
