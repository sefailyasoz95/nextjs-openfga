"use client";

import Link from "next/link";

type ResourceCardProps = {
	id: string;
	name: string;
	type: string;
};

export default function ResourceCard({ id, name, type }: ResourceCardProps) {
	return (
		<Link href={`/dashboard/admin/${id}`}>
			<div className='p-4 border rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white'>
				<h4 className='text-md font-semibold mb-1'>{name}</h4>
				<p className='text-sm text-gray-500'>{type}</p>
			</div>
		</Link>
	);
}
