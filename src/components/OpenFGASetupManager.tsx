"use client";

import { useEffect, useState } from "react";

type StoreInfo = {
	id: string;
};

export default function OpenFGASetupManager() {
	const [store, setStore] = useState<StoreInfo | null>(null);
	const [modelExists, setModelExists] = useState(false);
	const [loading, setLoading] = useState(false);

	const checkStore = async () => {
		try {
			const res = await fetch("/api/setup/check-store");
			const data = await res.json();
			if (data.store) {
				setStore(data.store);
			}
		} catch (err) {
			console.error("Error checking store:", err);
		}
	};

	// Check for store on mount
	useEffect(() => {
		checkStore();
	}, []);

	// If store exists, check model
	useEffect(() => {
		if (!store) return;

		const checkModel = async () => {
			try {
				const res = await fetch(`/api/setup/check-model/${store.id}`);
				const data = await res.json();
				setModelExists(data.exists);
			} catch (err) {
				console.error("Error checking model:", err);
			}
		};
		checkModel();
	}, [store]);

	const handleCreateStore = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/setup/create-store", {
				method: "POST",
			});
			const data = await res.json();
			setStore({ id: data.storeId });
		} catch (err) {
			console.error("Failed to create store:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateModel = async () => {
		if (!store) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/setup/set-auth-model/${store.id}`, {
				method: "POST",
			});
			if (res.ok) {
				setModelExists(true);
			}
		} catch (err) {
			console.error("Failed to create model:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-6 rounded-xl shadow-lg bg-white max-w-xl mx-auto mt-10'>
			<h2 className='text-2xl font-bold mb-4'>OpenFGA Setup Manager</h2>

			{!store && (
				<button onClick={handleCreateStore} disabled={loading} className='bg-blue-600 text-white px-4 py-2 rounded-md'>
					{loading ? "Creating Store..." : "Create Store"}
				</button>
			)}

			{store && (
				<>
					<div className='mb-4'>
						✅ Store ID: <code>{store.id}</code>
					</div>

					{!modelExists ? (
						<button
							onClick={handleCreateModel}
							disabled={loading}
							className='bg-green-600 text-white px-4 py-2 rounded-md'>
							{loading ? "Creating Model..." : "Create Authorization Model"}
						</button>
					) : (
						<div>✅ Authorization model exists.</div>
					)}
				</>
			)}
		</div>
	);
}
