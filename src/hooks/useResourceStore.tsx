import { Resource } from "@/lib/types";
import { useState, useEffect } from "react";

const STORAGE_KEY = "admin_resources";

export function useResourceStore() {
	const [resources, setResources] = useState<Resource[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			setResources(JSON.parse(stored));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
	}, [resources]);

	const addResource = (resource: Resource) => {
		setResources((prev) => [...prev, resource]);
	};

	const removeResource = (id: string) => {
		setResources((prev) => prev.filter((r) => r.id !== id));
	};

	return {
		resources,
		addResource,
		removeResource,
	};
}
