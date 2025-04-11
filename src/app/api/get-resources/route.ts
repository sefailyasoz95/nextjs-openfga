// src/lib/data.ts

import { Resource } from "@/lib/types";

export async function getUserRestrictedResources(): Promise<Resource[]> {
	const allResources: Resource[] = [
		{ id: "folder:reports", name: "Reports Folder", type: "user_restricted" },
		{ id: "folder:marketing", name: "Marketing Folder", type: "admin_restricted" },
	];

	return allResources.filter((r) => r.type === "user_restricted");
}
