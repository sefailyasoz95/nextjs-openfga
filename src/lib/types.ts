export type Resource = {
	id: string; // e.g. "folder:finance"
	name: string; // e.g. "Finance Folder"
	type: "admin_restricted" | "user_restricted";
};
