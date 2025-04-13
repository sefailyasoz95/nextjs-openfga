"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type AccessGuardProps = {
	children: React.ReactNode;
};

export default function AccessGuard({ children }: AccessGuardProps) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// If not authenticated, redirect to home page

		if (!isAuthenticated) {
			router.push("/");
		}
	}, [isAuthenticated, router]);

	// If not authenticated, don't render children
	if (!isAuthenticated) {
		return null;
	}

	// If authenticated, render children
	return <>{children}</>;
}
