import { FaGithub } from 'react-icons/fa';

export default function Footer() {
	return (
		<div className="mt-1 flex-col items-center gap-10 bg-gray-50 px-10 py-4 text-gray-400">
			<div className="hover:text-gray-800">
				<a href=" https://github.com/skkuse/2024spring_41class_team3 ">
					<FaGithub className="size-10" />
				</a>
			</div>
			<p className="pt-3 font-extrabold">
				&copy; 2024 SPRING SKKU SE CLASS 41 TEAM 3
			</p>
		</div>
	);
}
