import { Skeleton } from './ui/skeleton';

export default function LoadingTable() {
	return (
		<div className="flex-col gap-2">
			{Array.from({ length: 10 }).map((_, index) => (
				<Skeleton className="my-2 h-10 w-full" key={index} />
			))}
		</div>
	);
}
