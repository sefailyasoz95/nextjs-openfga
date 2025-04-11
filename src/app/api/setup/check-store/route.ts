// /api/setup/check-store/route.ts
import { NextResponse } from "next/server";
import { OpenFgaClient } from "@openfga/sdk";

export async function GET() {
	const fga = new OpenFgaClient({
		apiUrl: "http://localhost:8080",
	});

	try {
		const stores = await fga.listStores();

		if (stores.stores.length === 0) {
			return NextResponse.json({ store: null });
		}

		const store = stores.stores[0];
		return NextResponse.json({ store: { id: store.id } });
	} catch (error) {
		console.error("Error checking store:", error);
		return NextResponse.json({ error: "Failed to check store" }, { status: 500 });
	}
}
