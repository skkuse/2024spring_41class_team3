import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserSection({ user }) {
	return (
		<div className="border- my-10 flex flex-col gap-3 rounded-lg border border-l-8 border-l-lime-800 px-10 py-3">
			<p className="text-xl font-bold">CONTRIBUTER INFO</p>
			{user ? (
				<div className="flex gap-2">
					<Avatar className="size-16">
						<AvatarImage src={`https://github.com/${user}.png`} alt={user} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<a
						href={`https://github.com/${user}`}
						className="self-center hover:text-blue-500"
					>{`https://github.com/${user}`}</a>
				</div>
			) : (
				<p>Anonymous</p>
			)}
		</div>
	);
}
