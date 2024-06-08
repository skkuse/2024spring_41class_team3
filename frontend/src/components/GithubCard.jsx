import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@radix-ui/react-hover-card';

export function GithubCard({ children }) {
	return (
		<a
			href={`https://github.com/${children}`}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<HoverCard>
				<HoverCardTrigger className="hover:font-bold hover:underline">
					{children}
				</HoverCardTrigger>
				<HoverCardContent
					side="top"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className="rounded-lg bg-gray-50 p-4 shadow-lg">
						<a
							href={`https://github.com/${children}`}
						>{`github.com/${children}`}</a>
					</div>
				</HoverCardContent>
			</HoverCard>
		</a>
	);
}
