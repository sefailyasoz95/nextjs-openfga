import { CredentialsMethod, OpenFgaClient } from "@openfga/sdk";
import { fgaConfig } from "@/fga.config";

export const fgaClient = new OpenFgaClient({
	apiScheme: fgaConfig.apiScheme,
	apiHost: fgaConfig.apiHost,
	storeId: fgaConfig.storeId,
	authorizationModelId: fgaConfig.modelId,
	credentials: {
		method: CredentialsMethod.ApiToken,
		config: {
			token: fgaConfig.apiToken,
		},
	},
});
