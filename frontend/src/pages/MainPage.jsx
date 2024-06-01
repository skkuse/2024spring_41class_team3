import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ShowerImage from '@/images/1_shower.png';
import TrashImage from '@/images/2_trash.png';
import AirconImage from '@/images/3_aircon.png';
import SmartphoneImage from '@/images/4_smartphone.png';
import CarImage from '@/images/5_car.png';
import './MainPage.css';
import { world } from '@/components/worlddata';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function MainPage() {
	const [inputCode, setInputCode] = useState(''); // input code
	const [outputCode, setOutputCode] = useState(''); // output code

	const [inputflag, setInputFlag] = useState(false);
	const [inputEmission, setInputEmission] = useState(0.0);
	const [outputEmission, setOutputEmission] = useState(0.0);

	const onSubmitButtonClick = () => {
		// submit 버튼 눌렀을 때 동작하는 함수
		// inputCode를 서버로 보내고, 결과를 받아와서 outputCode에 저장하는 코드
		axios
			.post(
				`${BASE_URL}/code`,
				{
					code: inputCode,
					country: 'Korea', //TODO: FIX with dropdown
				},
				{
					withCredentials: false,
				},
			)
			.then((res) => {
				setOutputCode(res.data.after_code);
				setInputEmission(res.data.before_carbon.toFixed(1));
				setOutputEmission(res.data.after_carbon.toFixed(1));
			})
			.finally(setInputFlag(true));
		// 사용자 국가를 조사해 worlddata total_c에 추가
		//임시입니다. 실제로는 서버로 보낸 뒤 받은 코드를 띄워줘야 함
	};

	const Visualize_c = () => {
		const emission = (inputEmission - outputEmission).toFixed(1);

		var emissionStage = 0;

		emissionStage =
			emission <= 100
				? 1
				: emission <= 300
					? 2
					: emission <= 1000
						? 3
						: emission <= 2000
							? 4
							: 5;

		const showerminute = ((emission * 15) / 86).toFixed(1);
		const trashL = ((emission * 5) / 47).toFixed(1);
		const airconminute = ((emission * 10) / 43).toFixed(1);
		const phoneminute = ((emission * 4) / 67).toFixed(1);
		const carkm = (emission / 210).toFixed(1);

		const ctext =
			emissionStage <= 1
				? '= Shower ' + showerminute + ' minute(s)'
				: emissionStage <= 2
					? '= Waste ' + trashL + ' L'
					: emissionStage <= 3
						? '= Use Airconditioner ' + airconminute + ' minute(s)'
						: emissionStage <= 4
							? '= Use Smartphone ' + phoneminute + ' minute(s)'
							: '= Drive car ' + carkm + ' km ';
		var image =
			emissionStage <= 1
				? ShowerImage
				: emissionStage <= 2
					? TrashImage
					: emissionStage <= 3
						? AirconImage
						: emissionStage <= 4
							? SmartphoneImage
							: CarImage;
		if (inputflag) {
			return (
				<div className="flex flex-col items-center overflow-hidden">
					<h2 className="pb-4 text-4xl font-bold tracking-tight">
						Visualize Carbon Emission
					</h2>
					<div className="container">
						<div className="box" id="left-box">
							<div className="box-head">INPUT carbon emission (g)</div>
							<div className="num">{inputEmission}</div>
						</div>
						<div className="box" id="right-box">
							<div className="box-head">OUTPUT carbon emission (g)</div>
							<div className="num">{outputEmission}</div>
						</div>
						<div className="large-box" id="large-box">
							<b className="box-head">Effect</b> <br></br>
							Carbon Emission <b>{emission}g</b> is saved. <br></br>
							<b>{ctext}</b>
							<img src={image} alt="Placeholder" />
						</div>
					</div>
				</div>
			);
		} else
			return (
				<div>
					<strong>Input your code and Be green!</strong>
				</div>
			);
	};

	const World_ranking = () => {
		return (
			<div className="mr-10 w-96">
				<b>TOP Carbon Saving COUNTRY</b> / Carbon(g)
				<ul role="list" className="divide-y divide-gray-200">
					{world
						.sort((obj1, obj2) => obj2.total_c - obj1.total_c)
						.map((world) => (
							<li
								key={world.country}
								className="flex justify-between gap-x-6 py-5"
							>
								<div className="flex min-w-0 gap-x-4">
									<img
										className="h-12 w-12 flex-none rounded-full bg-gray-50"
										src={world.imageUrl}
										alt=""
									/>
									<div className="min-w-0 flex-auto">
										<p className="text-sm font-semibold leading-6 text-gray-900">
											{world.country}
										</p>
									</div>
								</div>
								<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
									<p className="text-sm leading-6 text-gray-900">
										{world.total_c}
									</p>
								</div>
							</li>
						))}
				</ul>
			</div>
		);
	};

	const Server_info = () => {
		return (
			<div className="w-96 pl-16">
				<h3 className="text-base font-semibold leading-7 text-gray-900">
					Server info.
				</h3>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-200">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								FastAPI
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								Calculate Green-algorithm-based Carbon Emission Logic
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								...
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								...
							</dd>
						</div>
					</dl>
				</div>
			</div>
		);
	};

	return (
		<Layout>
			<div>
				<div className="flex flex-col gap-40">
					<div className="flex h-96 justify-center gap-10 px-20">
						<div className="flex flex-col gap-3">
							<h1 className="text-xl font-bold text-lime-800">INPUT</h1>
							<CodeEditor
								value={inputCode}
								onChange={(value) => setInputCode(value)}
							/>
							{/*input*/}
							<div className="flex">
								<div className="flex-1" />
								<Button
									onClick={onSubmitButtonClick}
									className="bg-lime-500 hover:bg-lime-600"
								>
									submit
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<h1 className="text-xl font-bold text-lime-800">OUTPUT</h1>
							<CodeEditor value={outputCode} readOnly />
							{/*output 실제로는 output 코드 떠야 합니다~~*/}
						</div>
					</div>
					<div className="flex h-[800px] justify-between gap-5">
						<Server_info></Server_info>
						<Visualize_c></Visualize_c>
						<World_ranking></World_ranking>
					</div>
				</div>
			</div>
		</Layout>
	);
}
