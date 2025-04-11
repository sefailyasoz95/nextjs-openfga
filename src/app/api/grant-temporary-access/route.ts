import { NextResponse } from "next/server";
import fgaClient from "@/lib/fga";

export async function POST(req: Request) {
	try {
		const { user, duration, grantedBy } = await req.json();

		// Validate inputs
		if (!user || !duration) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		// Write tuple to grant temporary admin access
		await fgaClient.write({
			writes: [
				{
					user: user, // e.g. "user:bob"
					relation: "temp_access",
					object: "user_restricted:all", // This is a special object that represents all user resources
				},
			],
		});

		// Set up server-side expiration
		setTimeout(async () => {
			try {
				// Delete the tuple when the duration expires
				await fgaClient.write({
					deletes: [
						{
							user: user,
							relation: "temp_access",
							object: "user_restricted:all",
						},
					],
				});
				console.log(`Temporary admin access for ${user} has expired and been revoked`);
			} catch (error) {
				console.error("Error revoking temporary access:", error);
			}
		}, duration);

		// Log the action
		console.log(`Temporary admin access granted to ${user} by ${grantedBy} for ${duration}ms`);

		return NextResponse.json({
			success: true,
			message: `Temporary admin access granted to ${user}`,
		});
	} catch (error) {
		console.error("Error granting temporary access:", error);
		return NextResponse.json({ error: "Failed to grant temporary access" }, { status: 500 });
	}
}
