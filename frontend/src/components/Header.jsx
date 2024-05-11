import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function Header() {
	return (
		<>
			<div className='flex justify-between px-10 py-1'>
				<Button variant="ghost">GreenCoding</Button>
				<Button variant="ghost">Bulletin</Button>
			</div>
			<Separator className="bg-gradient-to-r from-lime-500 to-yellow-100 h-1"/>
		</>
	);
}
