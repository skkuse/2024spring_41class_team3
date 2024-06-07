import React, { useState, useEffect } from 'react';
import {
	FullpageContainer,
	FullpageSection,
} from '@shinyongjun/react-fullpage';
import { useNavigate } from 'react-router-dom';
import '@shinyongjun/react-fullpage/css';
import Typewriter from 'typewriter-effect';
import './CoverPage.css';
import CountUp from 'react-countup';
import { countryFlag } from '@/components/countryFlag';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function CoverPage() {
	const [totalCode, setTotalCode] = useState(0);
	const [totalCO2, setTotalCO2] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [world, setWorld] = useState([]);
	const navigate = useNavigate();

	// 마지막 섹션으로 스크롤 시 Main page로 이동
	useEffect(() => {
		if (activeIndex === 2) {
			setTimeout(() => {
				navigate('/');
			}, 400);
		}
	}, [activeIndex, navigate]);

	// 첫번째 섹션의 Total Users, Total CO2 Reduction 데이터 fetch
	useEffect(() => {
		axios
			.get(`${BASE_URL}/default`)
			.then((response) => {
				if (response.status === 200) {
					setTotalCode(response.data.total_visitor);
					setTotalCO2(response.data.total_reduction);
					setWorld(response.data['countries']);
				} else {
					console.error('cannot fetch data');
				}
			})
			.catch((error) => {
				console.error('Error while fetching data:', error);
			});
	}, []);

	return (
		<FullpageContainer
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			transitionDuration={1000} // 섹션 간 전환 속도
		>
			<FullpageSection name="first" className="flex">
				<div className="m-10 min-w-[65%] max-w-[65%]">
					<p className="text-9xl font-semibold text-lime-800">GREEN</p>
					<Typewriter
						onInit={(typewriter) => {
							typewriter
								.typeString('CO<sub>2</sub>')
								.typeString('DING')
								.pauseFor(1500)
								.start();
						}}
						options={{
							loop: true,
							wrapperClassName: 'text-9xl font-semibold text-lime-800',
						}}
					/>
				</div>
				<div className="min-w-[35%] max-w-[35%] flex-col bg-lime-800">
					<div className="ml-10 mt-10 h-1/2 w-full flex-col text-white">
						<p className="text-2xl font-semibold">Total Submitted Codes</p>
						<CountUp
							className="text-8xl font-semibold text-white"
							end={totalCode}
							duration={4}
						></CountUp>
					</div>
					<div className="ml-10 h-1/2 w-full flex-col text-white">
						<p className="text-2xl font-semibold">Total CO2 Reduction</p>
						<CountUp
							className="text-8xl font-semibold text-white"
							end={totalCO2}
							duration={4}
						></CountUp>
					</div>
				</div>
			</FullpageSection>
			<FullpageSection name="second">
				<div className="flex flex-col bg-lime-800">
					<p className="mt-3 text-center text-3xl font-semibold text-white">
						Participating Countries
					</p>
					<div className="flex flex-wrap justify-around">
						{world
							.sort((obj1, obj2) => obj2.total_reduction - obj1.total_reduction)
							.slice(0, Math.min(6, world.length))
							.map((world) => (
								<div key={world.name} className="m-3 flex h-1/2 w-1/4 flex-col">
									<img
										src={countryFlag[world.name]}
										alt={world.name}
										className="h-full w-full object-cover"
									></img>
								</div>
							))}
					</div>
				</div>
			</FullpageSection>
			<FullpageSection name="third">
				<div></div>
			</FullpageSection>
		</FullpageContainer>
	);
}
