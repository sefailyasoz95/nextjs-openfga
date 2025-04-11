"use client";
import { useAuth } from "@/hooks/useAuth";

type Props = {
	params: {
		resourceId: string;
	};
};
export default function ResourcePage({ params }: Props) {
	const { userId } = useAuth();

	return (
		<div>
			Hello {userId}, you're viewing {params.resourceId}
		</div>
	);
}
