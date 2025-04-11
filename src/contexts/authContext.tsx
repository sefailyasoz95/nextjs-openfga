"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
	userId: string;
	login: (userId: string) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [userId, setUserId] = useState(""); // default/mock user
	const router = useRouter();
	const pathname = usePathname();

	const login = (id: string) => setUserId(id);
	const logout = () => setUserId("");

	// Check if user is authenticated when page loads or refreshes
	// If not authenticated and on a protected route, redirect to home page
	useEffect(() => {
		const isAuthenticated = !!userId;
		const isProtectedRoute = pathname?.includes("/dashboard");

		if (!isAuthenticated && isProtectedRoute) {
			router.push("/");
		}
	}, [userId, pathname, router]);

	return <AuthContext.Provider value={{ userId, login, logout }}>{children}</AuthContext.Provider>;
};
