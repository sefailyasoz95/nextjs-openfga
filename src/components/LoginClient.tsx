"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

// Define user type for our component
type User = {
	email: string;
	role: "admin" | "user";
};

export default function LoginClient() {
	const router = useRouter();
	const { userId, login, logout } = useAuth();
	// Add a state to track if component is mounted on client
	const [isMounted, setIsMounted] = useState(false);

	// Set mounted state to true after hydration
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Determine if user is logged in based on userId from context
	const isLoggedIn = !!userId;

	// Create a user object based on userId format
	const getUserFromId = (id: string): User => {
		if (id.includes("admin")) {
			return {
				email: "admin@example.com",
				role: "admin",
			};
		} else {
			return {
				email: "user@example.com",
				role: "user",
			};
		}
	};

	const currentUser = isLoggedIn ? getUserFromId(userId) : null;

	const signIn = (user: User) => {
		// Use the login method from context with appropriate userId format
		const userId = user.role === "admin" ? "user:admin" : "user:alice";
		login(userId);

		// Navigate based on role
		user.role === "admin" ? router.push("/dashboard/admin") : router.push("/dashboard/user");
	};

	const signOut = () => {
		// Use the logout method from context
		logout();
	};

	// Show nothing until client-side hydration is complete
	if (!isMounted) {
		return null;
	}

	return (
		<>
			{!isLoggedIn ? (
				<div className='flex flex-col gap-4'>
					<button
						onClick={() =>
							signIn({
								email: "admin@example.com",
								role: "admin",
							})
						}
						className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>
						Sign in as Admin
					</button>
					<button
						onClick={() =>
							signIn({
								email: "user@example.com",
								role: "user",
							})
						}
						className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition'>
						Sign in as User
					</button>
				</div>
			) : (
				<div className='flex flex-col items-center gap-4'>
					<p className='text-lg'>
						Logged in as <strong>{currentUser?.email}</strong> ({currentUser?.role})
					</p>
					<button onClick={signOut} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>
						Sign Out
					</button>
				</div>
			)}
		</>
	);
}
