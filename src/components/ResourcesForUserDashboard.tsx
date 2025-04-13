"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import ResourceSection from "./ResourceSection";
import { getResourcesByType } from "@/lib/resources";
import { Resource } from "@/lib/types";

type Props = {};

const ResourcesForUserDashboard = (props: Props) => {
	const { authorizedAsAdmin } = useAuth();
	const [adminResources, setAdminResources] = useState<Resource[]>([]);
	useEffect(() => {
		// Only fetch admin resources if user is authorizedAsAdmin
		if (authorizedAsAdmin) {
			getResourcesByType("admin_restricted").then(setAdminResources);
		}
	}, [authorizedAsAdmin]);

	return authorizedAsAdmin ? <ResourceSection title='Admin Resources' resources={adminResources} /> : <></>;
};

export default ResourcesForUserDashboard;
