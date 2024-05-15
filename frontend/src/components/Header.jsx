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
			<div className='relative isolate flex bg-gray-50 flex justify-between px-10 py-1'>
			<Button variant="ghost" onClick={onHomeButtonClick}><img src={home} alt="Placeholder" style={{ width: '48px', height: '48px' }}/></Button>
			<p className="text-sm leading-6">
				<strong className="font-semibold">Green coding</strong>
				<svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
				</svg>
			  </p>
			  <a
				className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
			  >
				<Button variant="ghost" onClick={onBulletinButtonClick}><img src={bulletin} alt="Placeholder" style={{ width: '36px', height: '36px' }}/>Bulletin</Button> <span aria-hidden="true">&rarr;</span>
			  </a>
			</div>
			<Separator className="bg-gradient-to-r from-lime-500 to-yellow-100 h-1"/>
		</>
	);
}
