import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BulletinTable } from '@/components/BulletinTable';
import { bulletinData } from '@/components/bulletindata';
import { columns } from '@/components/Column';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function ListPage() {
	const algorithms = [
		'algorithm1',
		'algorithm2',
		'algorithm3',
		'algorithm4',
		'algorithm5',
	];
	const colors = [
		'bg-lime-300',
		'bg-yellow-300',
		'bg-cyan-300',
		'bg-pink-300',
		'bg-purple-300',
	];

	const [data, setData] = useState([]);

	const getData = (type) => {
		axios.get(`${BASE_URL}/bulletin/${type}`).then((res) => {
			setData(res.data.codes);
		});
	};

	useEffect(() => {
		getData(1);
	}, []);

	return (
		<Layout>
			<div className="w-[1000px]">
				<Tabs defaultValue={algorithms[0]} className="w-[400px]">
					<TabsList className="bg-transparent">
						{algorithms.map((algorithm, index) => (
							<TabsTrigger
								key={index}
								value={algorithm}
								className=" h-12 w-32 flex-col items-start  pr-3 text-gray-400 data-[state=active]:text-xl "
								onClick={() => getData(index + 1)}
							>
								<div className="flex">
									<div
										className={cn(
											'relative h-6 w-[70px] rounded-t-md',
											colors[index],
										)}
									/>
									<div className="h-6 w-16 border-b-[1px]" />
								</div>
								{algorithm}
							</TabsTrigger>
						))}
					</TabsList>
					<div className=" w-[900px] pt-12">
						{algorithms.map((algorithm, index) => (
							<TabsContent
								key={index}
								value={algorithm}
								className="bg-transparent"
							>
								{/*TODO: 실제 데이터로 바꾸기!! 지금은 목업임!!!*/}
								<BulletinTable data={data} columns={columns} />
							</TabsContent>
						))}
					</div>
				</Tabs>
			</div>
		</Layout>
	);
}
