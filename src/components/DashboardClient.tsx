"use client";
import { useEffect, useState, useTransition } from "react";

export default function DashboardClient() {
	const [hasAccess, setHasAccess] = useState<boolean | null>(null);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		startTransition(() => {
			fetch("/api/check-access", {
				method: "POST",
				body: JSON.stringify({
					user: "user:alice",
					relation: "owner",
					resource: "admin_restricted:finance",
				}),
			})
				.then((res) => res.json())
				.then((data) => setHasAccess(data.allowed));
		});
	}, []);

	return (
		<div>
			{isPending ? (
				<p>Checking access...</p>
			) : hasAccess ? (
				<p className='text-green-500'>Access granted to admin dashboard.</p>
			) : (
				<p className='text-red-500'>Access denied.</p>
			)}
		</div>
	);
}
