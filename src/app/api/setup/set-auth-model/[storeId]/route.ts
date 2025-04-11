// app/api/openfga/set-auth-model/route.ts
import { NextResponse } from "next/server";
import { OpenFgaClient } from "@openfga/sdk";

const storeId = "REPLACE_WITH_DYNAMIC_OR_SAVED_STORE_ID"; // 👈 Update this or use env/context

const authModel: any = {
	schema_version: "1.1",
	type_definitions: [
		{ type: "user" },
		{
			type: "organization",
			relations: {
				owner: { this: {} },
				member: { this: {} },
				parent_organization: { this: {} },
			},
			metadata: {
				relations: {
					owner: { directly_related_user_types: [{ type: "user" }] },
					member: { directly_related_user_types: [{ type: "user" }] },
					parent_organization: { directly_related_user_types: [{ type: "organization" }] },
				},
			},
		},
		{
			type: "admin_restricted",
			relations: {
				owner: { this: {} },
				parent_organization: { this: {} },
				viewer: {
					union: {
						child: [
							{
								tupleToUserset: {
									tupleset: {
										object: "",
										relation: "parent_organization",
									},
									computedUserset: {
										object: "$TUPLE_USERSET_OBJECT",
										relation: "owner",
									},
								},
							},
						],
					},
				},
			},
			metadata: {
				relations: {
					owner: { directly_related_user_types: [{ type: "user" }] },
					parent_organization: { directly_related_user_types: [{ type: "organization" }] },
				},
			},
		},
		{
			type: "user_restricted",
			relations: {
				member: { this: {} },
				temp_access: { this: {} },
				viewer: {
					union: {
						child: [
							{ computedUserset: { object: "", relation: "member" } },
							{ computedUserset: { object: "", relation: "temp_access" } },
						],
					},
				},
			},
			metadata: {
				relations: {
					member: { directly_related_user_types: [{ type: "user" }] },
					temp_access: { directly_related_user_types: [{ type: "user" }] },
				},
			},
		},
	],
};

export async function POST() {
	try {
		const client = new OpenFgaClient({
			apiUrl: "http://localhost:8080",
			storeId,
		});

		const result = await client.writeAuthorizationModel(authModel);

		return NextResponse.json({ modelId: result.authorization_model_id });
	} catch (error) {
		console.error("Error uploading auth model:", error);
		return NextResponse.json({ error: "Failed to upload model" }, { status: 500 });
	}
}
