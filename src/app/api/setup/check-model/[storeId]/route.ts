// /api/setup/check-model/[storeId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenFgaClient } from "@openfga/sdk";

type Params = {
	storeId: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
	const { storeId } = context.params;

	const fga = new OpenFgaClient({
		apiUrl: "http://localhost:8080",
		storeId,
	});

	try {
		const models = await fga.listStores();

		if (models.stores.length === 0) {
			return NextResponse.json({ exists: false });
		}

		return NextResponse.json({ exists: true });
	} catch (error) {
		console.error("Error checking authorization model:", error);
		return NextResponse.json({ error: "Failed to check model" }, { status: 500 });
	}
}
