"use client";

import { createContext, useContext, useState } from "react";

type AuthContextType = {
	userId: string;
	login: (userId: string) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [userId, setUserId] = useState("user:alice"); // default/mock user

	const login = (id: string) => setUserId(id);
	const logout = () => setUserId("");

	return <AuthContext.Provider value={{ userId, login, logout }}>{children}</AuthContext.Provider>;
};
