import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");

	// Add isAuthenticated property to easily check login status
	return {
		...context,
		isAuthenticated: !!context.userId,
	};
};
