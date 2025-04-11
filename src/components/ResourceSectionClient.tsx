"use client";

import { useResourceStore } from "@/hooks/useResourceStore";
import ResourceSection from "./ResourceSection";
import { Resource } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
	initialResources: Resource[];
	title: string;
	type: "admin_restricted" | "user_restricted";
};

// This client component allows for client-side updates to resources
// while still using server-rendered initial data
export default function ResourceSectionClient({ initialResources, title, type }: Props) {
	const { resources } = useResourceStore();
	const [displayResources, setDisplayResources] = useState<Resource[]>(initialResources);

	// Sync with client-side store for any updates
	useEffect(() => {
		// Filter client-side resources by type
		const filteredResources = resources.filter((r) => r.type === type);

		// If we have client-side resources of this type, use them
		// Otherwise, keep using the server-provided initialResources
		if (filteredResources.length > 0) {
			setDisplayResources(filteredResources);
		} else if (resources.length > 0 && filteredResources.length === 0) {
			// If we have resources but none of this type, show empty
			setDisplayResources([]);
		}
		// We don't set displayResources if resources is empty array
		// This prevents wiping out initialResources when the store is still initializing
	}, [resources, type, initialResources]);

	return <ResourceSection title={title} resources={displayResources} />;
}
