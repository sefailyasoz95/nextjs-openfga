"use client";

import { useEffect, useState } from "react";
import ResourceSection from "@/components/ResourceSection";
import ResourceSectionClient from "@/components/ResourceSectionClient";
import AccessGuard from "@/components/AccessGuard";
import { getResourcesByType } from "@/lib/resources";
import { useAuth } from "@/hooks/useAuth";
import { Resource } from "@/lib/types";

export default function UserDashboard() {
	const { userId, isAuthenticated } = useAuth();
	const [userResources, setUserResources] = useState<Resource[]>([]);
	const [adminResources, setAdminResources] = useState<Resource[]>([]);

	useEffect(() => {
		// Fetch user resources
		getResourcesByType("user_restricted").then(setUserResources);

		// Only fetch admin resources if user is authenticated
		if (isAuthenticated) {
			getResourcesByType("admin_restricted").then(setAdminResources);
		}
	}, [isAuthenticated]);

	return (
		<AccessGuard>
			<div className='p-6'>
				<h1 className='text-2xl font-bold mb-4'>User Dashboard</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Use client component with client-fetched data */}
					<ResourceSectionClient title='Your Resources' initialResources={userResources} type='user_restricted' />
					{isAuthenticated && (
						<ResourceSectionClient title='Admin Resources' initialResources={adminResources} type='admin_restricted' />
					)}
				</div>
			</div>
		</AccessGuard>
	);
}
