import { fgaClient } from "@/lib/fga";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { user, relation, resource } = await req.json();
	const allowed = await fgaClient.check({
		user,
		relation,
		object: resource,
	});
	return NextResponse.json({ allowed: allowed.allowed });
}
