import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BulletinTable } from '@/components/BulletinTable';
import { columns } from '@/components/Column';
import axios from 'axios';
import LoadingTable from '@/components/LoadingTable';

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
	const algorithm_info = [
		'An algorithm to prevent function calls within a loop',
		'An algorithm to avoid nested if statements',
		'An algorithm to prevent object declarations within a loop',
		'An algorithm to replace string concatenation with a StringBuilder',
		'',
	];

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getData = (type) => {
		setIsLoading(true);
		axios.get(`${BASE_URL}/bulletin/${type}`).then((res) => {
			setData(res.data.codes);
			setIsLoading(false);
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
					<div className=" w-[900px]">
						{algorithms.map((algorithm, index) => (
							<TabsContent
								key={index}
								value={algorithm}
								className="bg-transparent"
							>
								<p className="pb-10 pl-5 pt-4 font-bold text-gray-500">
									- {algorithm_info.at(index)}
								</p>
								{isLoading ? (
									<LoadingTable />
								) : (
									<BulletinTable data={data} columns={columns} />
								)}
							</TabsContent>
						))}
					</div>
				</Tabs>
			</div>
		</Layout>
	);
}
