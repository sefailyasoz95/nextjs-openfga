import { NextResponse } from "next/server";
import { OpenFgaClient } from "@openfga/sdk";

export async function POST(req: Request) {
	try {
		const { user, duration, grantedBy, storeId, objectId } = await req.json();

		if (!user || !duration || !storeId || !objectId) {
			return NextResponse.json(
				{ error: "Missing required fields: user, duration, storeId, objectId" },
				{ status: 400 }
			);
		}

		const fga = new OpenFgaClient({
			apiUrl: "http://localhost:8080",
			storeId,
		});

		const formattedUser = user.startsWith("user:") ? user : `user:${user}`;
		const object = `user_restricted:${objectId}`;

		// Grant access
		await fga.write({
			writes: [
				{
					user: formattedUser,
					relation: "temp_access",
					object,
				},
			],
		});

		setTimeout(async () => {
			try {
				await fga.write({
					deletes: [
						{
							user: formattedUser,
							relation: "temp_access",
							object,
						},
					],
				});
				console.log(`[TEMP ACCESS REVOKED] ${formattedUser} for ${object}`);
			} catch (error) {
				console.error("Failed to revoke access:", error);
			}
		}, duration);

		console.log(`[TEMP ACCESS GRANTED] ${formattedUser} by ${grantedBy} for ${duration}ms`);

		return NextResponse.json({
			success: true,
			message: `Temporary access granted to ${formattedUser}`,
		});
	} catch (error) {
		console.error("Unexpected error in grant-temporary-access:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
