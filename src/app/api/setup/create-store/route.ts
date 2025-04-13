// app/api/openfga/create-store/route.ts
import { NextResponse } from "next/server";
import { OpenFgaClient } from "@openfga/sdk";

export async function POST() {
	try {
		const client = new OpenFgaClient({ apiUrl: "http://localhost:8080" });

		const response = await client.createStore({
			name: "smartface",
		});

		return NextResponse.json({ storeId: response.id });
	} catch (error) {
		console.error("Failed to create store:", error);
		return NextResponse.json({ error: "Failed to create store" }, { status: 500 });
	}
}
