// components/ResourceSection.tsx
import ResourceCard from "./ResourceCard";
import { Resource } from "@/lib/types"; // assume you have a Resource type

type Props = {
	title: string;
	resources: Resource[];
};

export default function ResourceSection({ title, resources }: Props) {
	return (
		<section className='mb-6'>
			<h3 className='text-xl font-bold mb-2'>{title}</h3>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{resources.map((res) => (
					<ResourceCard key={res.id} id={res.id} name={res.name} type={res.type} />
				))}
			</div>
		</section>
	);
}
