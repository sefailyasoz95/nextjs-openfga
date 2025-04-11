"use client";

import NewResourceForm from "@/components/NewResourceForm";
import OpenFGASetupManager from "@/components/OpenFGASetupManager";
import ResourceSection from "@/components/ResourceSection";
import { useResourceStore } from "@/hooks/useResourceStore";

export default function AdminDashboard() {
	const { resources } = useResourceStore();

	const adminResources = resources.filter((r) => r.type === "admin_restricted");
	const userResources = resources.filter((r) => r.type === "user_restricted");

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
			<OpenFGASetupManager />
			{/* New resource creation form */}
			<NewResourceForm />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
				<ResourceSection title='Admin Restricted' resources={adminResources} />
				<ResourceSection title='User Restricted' resources={userResources} />
			</div>
		</div>
	);
}
