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
import { world } from '@/components/worlddata';

export default function CoverPage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const navigate = useNavigate();

	// 현재 섹션 인덱스를 감지하고, 마지막 섹션으로 스크롤한 경우 MainPage로 이동합니다.
	useEffect(() => {
		if (activeIndex === 2) {
			setTimeout(() => {
				// 지정된 시간(예: 1000ms 후)이 지난 후에 페이지 이동을 수행합니다.
				navigate('/');
			}, 500); // 1000ms (1초)의 딜레이 설정
			// 마지막 섹션의 인덱스
			//window.scrollTo(0, 0);
		}
	}, [activeIndex, navigate]);

	return (
		<FullpageContainer
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			transitionDuration={1000} // 섹션 간 전환 속도
		>
			<FullpageSection name="first" className="flex">
				<div style={{ width: '70%' }} className="m-10">
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
				<div style={{ width: '30%' }} className="flex-col bg-lime-800">
					<div className="ml-10 mt-10 h-1/2 w-full flex-col text-white">
						<p className="text-2xl font-semibold">Total Users</p>
						<CountUp
							className="text-9xl font-semibold text-white"
							end={100}
							duration={5}
						></CountUp>
					</div>
					<div className="ml-10 h-1/2 w-full flex-col text-white">
						<p className="text-2xl font-semibold">Total CO2 Reduction</p>
						<CountUp
							className="text-9xl font-semibold text-white"
							end={300}
							duration={5}
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
							.sort((obj1, obj2) => obj2.total_c - obj1.total_c)
							.map((world) => (
								<div
									key={world.country}
									className="m-3 flex h-1/2 w-1/4 flex-col"
								>
									<img
										src={world.imageUrl}
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
