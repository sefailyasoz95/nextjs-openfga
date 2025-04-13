import { OpenFgaClient } from "@openfga/sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { user, relation, object, storeId } = await req.json();
	try {
		const fga = new OpenFgaClient({
			apiUrl: "http://localhost:8080",
			storeId,
		});

		const allowed = await fga.check({
			user,
			relation,
			object,
		});
		console.log("allowed: ", allowed);
		return NextResponse.json({ allowed: allowed.allowed });
	} catch (error) {
		return NextResponse.json({ allowed: false });
	}
}
