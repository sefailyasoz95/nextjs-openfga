import { Resource } from "./types";

export async function getResources(): Promise<Resource[]> {
	// This would typically fetch from a database or API
	// For now, we'll use static data similar to what's in localStorage
	const resources: Resource[] = [
		{ id: "folder:reports", name: "Reports Folder", type: "user_restricted" },
		{ id: "folder:marketing", name: "Marketing Folder", type: "admin_restricted" },
		{ id: "folder:finance", name: "Finance Folder", type: "admin_restricted" },
		{ id: "folder:documents", name: "Documents Folder", type: "user_restricted" },
	];

	return resources;
}

export async function getResourcesByType(type: "admin_restricted" | "user_restricted"): Promise<Resource[]> {
	const resources = await getResources();
	return resources.filter((r) => r.type === type);
}
