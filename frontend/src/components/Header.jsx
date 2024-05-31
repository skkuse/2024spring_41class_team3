import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import HomeImage from '@/images/green-coding.png';
import BulletinImage from '@/images/bulletin.png';

export default function Header() {
	const navigate = useNavigate();
	const onHomeButtonClick = () => {
		navigate(`/`);
	};

	const onBulletinButtonClick = () => {
		navigate('/list');
	};

	const home = HomeImage;
	const bulletin = BulletinImage;

	return (
		<>
			<div className="flex h-20 items-center justify-between bg-gray-50 px-10 py-1">
				<Button
					variant="ghost"
					className="rounded-full p-8 hover:bg-lime-700/15"
					onClick={onHomeButtonClick}
				>
					<img
						src={home}
						alt="Placeholder"
						style={{ width: '64px', height: '64px' }}
					/>
				</Button>
				<p className="flex text-4xl font-semibold text-lime-700">
					GREEN CO
					<p className="relative mt-5 text-base font-semibold text-lime-700">
						2
					</p>
					DING
				</p>
				<div className="flex rounded-full bg-lime-600/80 px-3.5 py-2 text-xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
					<Button
						variant="ghost"
						className="flex gap-2 bg-transparent text-xl hover:bg-transparent"
						onClick={onBulletinButtonClick}
					>
						<img
							src={bulletin}
							alt="Placeholder"
							style={{ width: '36px', height: '36px' }}
						/>
						Bulletin
						<p className="text-2xl">&rarr;</p>
					</Button>
				</div>
			</div>
			<Separator className="h-1 bg-gradient-to-r from-lime-500 to-yellow-100" />
		</>
	);
}
