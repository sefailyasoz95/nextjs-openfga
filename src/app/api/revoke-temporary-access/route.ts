import { OpenFgaClient } from "@openfga/sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { user, revokedBy, storeId } = await req.json();

		// Validate inputs
		if (!user) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		const fga = new OpenFgaClient({
			apiUrl: "http://localhost:8080",
			storeId,
		});
		// Delete the tuple to revoke temporary access
		await fga.write({
			deletes: [
				{
					user: user,
					relation: "temp_access",
					object: "user_restricted:all",
				},
			],
		});

		// Log the action
		console.log(`Temporary admin access revoked from ${user} by ${revokedBy}`);

		return NextResponse.json({
			success: true,
			message: `Temporary admin access revoked from ${user}`,
		});
	} catch (error) {
		console.error("Error revoking temporary access:", error);
		return NextResponse.json({ error: "Failed to revoke temporary access" }, { status: 500 });
	}
}
