import { getResourcesByType } from "@/lib/resources";
import ResourcesForUserDashboard from "@/components/ResourcesForUserDashboard";
import ResourceSection from "@/components/ResourceSection";

export default async function UserDashboard() {
	const userResources = await getResourcesByType("user_restricted");

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>User Dashboard</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<ResourceSection title='Your Resources' resources={userResources} />
				<ResourcesForUserDashboard />
			</div>
		</div>
	);
}
