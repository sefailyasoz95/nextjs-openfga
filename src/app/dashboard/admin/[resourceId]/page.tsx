type Props = {
	params: {
		resourceId: string;
	};
};
export default async function ResourcePage({ params }: Props) {
	const { resourceId } = await params;
	return <div>you're viewing {resourceId}</div>;
}
