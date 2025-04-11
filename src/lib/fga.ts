// lib/fgaClient.ts

import { OpenFgaClient } from "@openfga/sdk";

const fgaClient = new OpenFgaClient({
	apiUrl: "http://localhost:8080", // Your local FGA container URL
	storeId: "01JRJ2KZ7RNM9J7G3MB8AGM82Y", // Your actual store ID
});

export default fgaClient;
