import { Resource } from "@/lib/types";
export const mockResources: Resource[] = [
	{
		id: "folder:finance",
		name: "Finance Folder",
		type: "admin_restricted",
	},
	{
		id: "folder:hr",
		name: "HR Folder",
		type: "admin_restricted",
	},
	{
		id: "doc:policies",
		name: "Company Policies",
		type: "user_restricted",
	},
];
