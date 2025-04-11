import fgaClient from "./fga";

export async function checkAdminAccess(userId: string): Promise<boolean | undefined> {
	try {
		// Check if user has admin access to restricted resources
		const response = await fgaClient.check({
			user: `user:${userId}`,
			relation: "viewer",
			object: "admin_restricted:all",
		});

		return response.allowed;
	} catch (error) {
		console.error("Error checking admin access:", error);
		return false;
	}
}
