"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
	userId: string;
	login: (userId: string) => void;
	logout: () => void;
	authorizedAsAdmin: boolean;
	storeId?: string;
	modelId?: string;
	setModelId: (modelId?: string) => void;
	setStoreId: (storeId?: string) => void;
	checkAdminAccess: (userId: string) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type StoreInfo = {
	id: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [userId, setUserId] = useState("");
	const [authorizedAsAdmin, setAuthorizedAsAdmin] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const [storeId, setStoreId] = useState<string | undefined>(undefined);
	const [modelId, setModelId] = useState<string | undefined>(undefined);
	const login = (id: string) => setUserId(id);
	const logout = () => setUserId("");

	const checkStore = async () => {
		try {
			const res = await fetch("/api/setup/check-store");
			const data = await res.json();
			if (data.store) {
				setStoreId(data.store.id);
			}
		} catch (err) {
			console.error("Error checking store:", err);
		}
	};

	// Check for store on mount
	useEffect(() => {
		checkStore();
	}, []);

	const checkAdminAccess = async (userId: string) => {
		const response = await fetch("/api/check-access", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: `${userId}`,
				relation: "viewer",
				object: "admin_restricted:all",
				storeId,
			}),
		});
		const result = await response.json();
		if (!response.ok) {
			alert("Error checking admin access");
			return;
		}

		if (result.allowed) {
			setAuthorizedAsAdmin(true);
		} else {
			setAuthorizedAsAdmin(false);
		}
	};

	useEffect(() => {
		const isAuthenticated = !!userId;
		const isProtectedRoute = pathname?.includes("/dashboard");

		if (!isAuthenticated && isProtectedRoute) {
			router.push("/");
		}
		if (isAuthenticated) {
			checkAdminAccess(userId);
		}
	}, [userId, pathname, router]);

	return (
		<AuthContext.Provider
			value={{ userId, login, logout, authorizedAsAdmin, setModelId, setStoreId, modelId, storeId, checkAdminAccess }}>
			{children}
		</AuthContext.Provider>
	);
};
