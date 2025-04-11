import OpenFGASetupManager from "@/components/OpenFGASetupManager";
import ResourceSectionClient from "@/components/ResourceSectionClient";
import TemporaryAdminAccess from "@/components/TemporaryAdminAccess";
import AccessGuard from "@/components/AccessGuard";
import { getResourcesByType } from "@/lib/resources";

export default async function AdminDashboard() {
	// Fetch resources on the server
	const adminResources = await getResourcesByType("admin_restricted");
	const userResources = await getResourcesByType("user_restricted");

	return (
		<AccessGuard>
			<div className='p-6'>
				<h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
				{/* These remain client components */}
				<OpenFGASetupManager />
				<TemporaryAdminAccess />

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
					{/* Use client components with server-fetched initial data */}
					<ResourceSectionClient title='Admin Restricted' initialResources={adminResources} type='admin_restricted' />
					<ResourceSectionClient title='User Restricted' initialResources={userResources} type='user_restricted' />
				</div>
			</div>
		</AccessGuard>
	);
}
