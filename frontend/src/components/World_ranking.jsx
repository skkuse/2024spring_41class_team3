import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { countryFlag } from './countryFlag';

const BASE_URL = process.env.REACT_APP_API_URL;

const World_ranking = ({ submitCount }) => {
	const [world, setWorld] = useState([]);

	const fetchData = () => {
		axios
			.get(`${BASE_URL}/default`)
			.then((response) => {
				if (response.status === 200) {
					setWorld(response.data['countries']);
				} else {
					console.error('cannot fetch data');
				}
			})
			.catch((error) => {
				console.error('Error while fetching data:', error);
			});
	};

	useEffect(() => {
		fetchData();
	}, [submitCount]);

	return (
		<div className="mr-10 w-96">
			<b>TOP Carbon Saving COUNTRY</b> / Carbon(g)
			<ul className="divide-y divide-gray-200">
				{typeof world !== 'undefined' &&
					world
						.sort((obj1, obj2) => obj2.total_reduction - obj1.total_reduction)
						.slice(0, Math.min(6, world.length))
						.map((world) => {
							return (
								<li
									key={world.name}
									className="flex justify-between gap-x-6 py-5"
								>
									<div className="flex min-w-0 gap-x-4">
										<img
											className="h-12 w-12 flex-none rounded-full bg-gray-50"
											src={countryFlag[world.name]}
											alt=""
										/>
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-semibold leading-6 text-gray-900">
												{world.name}
											</p>
										</div>
									</div>
									<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
										<p className="text-sm leading-6 text-gray-900">
											{world.total_reduction.toFixed(4)}
										</p>
									</div>
								</li>
							);
						})}
			</ul>
		</div>
	);
};

export default World_ranking;
