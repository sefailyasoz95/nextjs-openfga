import SignInForm from "@/components/SignInForm";
import Image from "next/image";

export default function Home() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<h1 className='font-medium tracking-wide'>Welcome to TodoMaster, sign in below! </h1>
			<SignInForm />
		</div>
	);
}
