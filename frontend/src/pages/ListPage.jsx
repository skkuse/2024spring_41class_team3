import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { BulletinTable } from '@/components/BulletinTable';
import { columns } from '@/components/Column';
import axios from 'axios';
import LoadingTable from '@/components/LoadingTable';
import { FaFilter } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { isEqual } from 'lodash';

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

	const [algorithmType, setAlgorithmType] = useState(1);
	const [radioValue, setRadioValue] = useState('newest');
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getData = (type) => {
		setIsLoading(true);
		setAlgorithmType(type);
		axios.get(`${BASE_URL}/bulletin/${type}`).then((res) => {
			if (typeof res.data.codes !== 'undefined') {
				setData(res.data.codes.sort((a, b) => b.id - a.id));
				setIsLoading(false);
			}
		});
	};

	useEffect(() => {
		getData(1);
	}, []);

	useEffect(() => {
		const sort = (value) => {
			let sortedList = [];
			if (value === 'runtime') {
				sortedList = [...data].sort((a, b) => a.runtime - b.runtime);
			} else if (value === 'newest') {
				sortedList = [...data].sort((a, b) => b.id - a.id);
			} else if (value === 'memory') {
				sortedList = [...data].sort((a, b) => a.memory - b.memory);
			} else {
				sortedList = [...data].sort((a, b) => {
					const diffA = a.after_carbon - a.before_carbon;
					const diffB = b.after_carbon - b.before_carbon;
					return diffA - diffB;
				});
			}

			return sortedList;
		};
		const sortedList = sort(radioValue);
		if (!isEqual(sortedList, data)) {
			setData(sortedList);
		}
	}, [radioValue, data]);

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
					<div className="flex w-[900px] flex-col justify-between pt-12">
						<div className="flex items-center gap-3 pb-5">
							<p className="font-bold text-gray-500 ">
								{algorithmType === 1 &&
									'Algorithm to prevents function call within loop'}
								{algorithmType === 2 &&
									'Algorithm to block nested if-statements'}
								{algorithmType === 3 &&
									'Algorithm to prevent object declaration within loop'}
								{algorithmType === 4 &&
									'Algorithm to convert String concatenation with a StringBuilder'}
								{algorithmType === 5 && ''}
							</p>
							<FaFilter className="ml-auto size-5 text-lime-800" />
							<RadioGroup
								className="flex"
								defaultValue="newest"
								onValueChange={(value) => {
									if (!isLoading) setRadioValue(value);
								}}
							>
								{isLoading && (
									<div
										className="absolute inset-0 z-10 cursor-wait"
										onClick={(e) => e.preventDefault()}
									/>
								)}
								<div className="relative flex gap-3 text-gray-500">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="newest" id="newest" />
										<Label htmlFor="newest">Newest</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="runtime" id="runtime" />
										<Label htmlFor="runtime">Runtime</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="CO2" id="CO2" />
										<Label htmlFor="CO2">CO2</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="memory" id="memory" />
										<Label htmlFor="memory">Memory</Label>
									</div>
								</div>
							</RadioGroup>
						</div>

						{algorithms.map((algorithm, index) => (
							<TabsContent
								key={index}
								value={algorithm}
								className="bg-transparent"
							>
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
