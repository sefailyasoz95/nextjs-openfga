import LoginClient from "@/components/LoginClient";

export default function HomePage() {
	return (
		<main className='flex flex-col items-center justify-center min-h-screen p-6'>
			<h1 className='text-3xl font-bold mb-6'>OpenFGA & Nextjs Todo Admin App</h1>
			<LoginClient />
		</main>
	);
}
