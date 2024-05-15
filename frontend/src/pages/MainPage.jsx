import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import ShowerImage from '@/images/1_shower.png';
import TrashImage from '@/images/2_trash.png';
import AirconImage from '@/images/3_aircon.png';
import SmartphoneImage from '@/images/4_smartphone.png';
import CarImage from '@/images/5_car.png';
import './MainPage.css'

export default function MainPage() {
	const [inputCode, setInputCode] = useState(''); // input code
	const [outputCode, setOutputCode] = useState(''); // output code

	const [inputflag, setInputFlag] = useState(false);
	const [inputEmission, setInputEmission] = useState(0.0);
	const [outputEmission, setOutputEmission] = useState(0.0);
	const [emission, setEmission] = useState(0.0);


	const onSubmitButtonClick = () => {
		// submit 버튼 눌렀을 때 동작하는 함수
		// inputCode를 서버로 보내고, 결과를 받아와서 outputCode에 저장하는 코드
		setInputEmission(2550.0);

		setOutputCode(inputCode);

		setOutputEmission(11.1);
		setInputFlag(true);
		//임시입니다. 실제로는 서버로 보낸 뒤 받은 코드를 띄워줘야 함
	};

	const Visualize_c = () => {
		setEmission(inputEmission - outputEmission);
	
	var emissionStage = 0;
	
	emissionStage = emission <= 100 ? 1 : emission <= 300 ? 2 : emission <= 1000 ? 3 : emission <= 2000 ? 4 : 5;
	
	
	const showerminute = (emission * 15 / 86).toFixed(2); 
	const trashL = (emission * 5 / 47).toFixed(2);
	const airconminute = (emission * 10 / 43).toFixed(2);
	const phoneminute = (emission * 4 / 67).toFixed(2);
	const carkm = (emission / 210).toFixed(2);
	
	const ctext = emissionStage <= 1 ? '= Shower '+ showerminute + ' minute(s)' : 
	emissionStage <= 2 ? '= Waste '+ trashL +' L' :
	emissionStage <= 3 ? '= Use Airconditioner '+ airconminute +' minute(s)' :
	emissionStage <= 4 ? '= Use Smartphone '+ phoneminute +' minute(s)' :
	'= Drive car '+ carkm +' km ';
	var image = emissionStage <= 1 ? ShowerImage : emissionStage <= 2 ? TrashImage : emissionStage <= 3 ? AirconImage : emissionStage <= 4 ? SmartphoneImage : CarImage;
	if(inputflag){
		return (
			<div className="relative isolate overflow-hidden py-24 sm:py-32">
	<div className="mx-auto max-w-7xl px-6 lg:px-8">
	  <div className="mx-auto max-w-2xl lg:mx-0">
		<h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Visualize Carbon Emission</h2>
	  </div>
            <div className="container">
                          <div className="box" id="left-box"><div className="box-head">INPUT carbon emission (g)</div><div className='num'>{inputEmission}</div></div>
                          <div className="box" id="right-box"><div className="box-head">OUTPUT carbon emission (g)</div><div className='num'>{outputEmission}</div></div>
                          <div className="large-box" id="large-box">
						  <b className='box-head'>Effect</b> <br></br>
                          Carbon Emission <b>{emission}g</b> is saved. <br></br>
                            {ctext}
                        <img src={image} alt="Placeholder" />
                          </div>
            </div>
			</div>
			</div>
		);
    }
	else
		return ( <div><strong>코드를 입력해 탄소 배출량을 절약하세요!</strong></div>);
	}

	const world = [
		{
		  country: 'Korea',
		  total_c: '1',
		  imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			country: 'China',
			total_c: '1',
		  imageUrl:
			'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			country: 'Japan',
			total_c: '1',
		  imageUrl:
			'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			country: 'Italia',
			total_c: '1',
		  imageUrl:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			country: 'Spain',
			total_c: '1',
		  imageUrl:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			country: 'America',
			total_c: '1',
		  imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	  ]
	  
	const World_ranking = () => {
		
		return (
			<div><b>TOP 3 COUNTRY</b> / Carbon(kg)
		  <ul role="list" className="divide-y divide-gray-100">
			{world.map((world) => (
			  <li key={world.country} className="flex justify-between gap-x-6 py-5">
				<div className="flex min-w-0 gap-x-4">
				  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={world.imageUrl} alt="" />
				  <div className="min-w-0 flex-auto">
					<p className="text-sm font-semibold leading-6 text-gray-900">{world.country}</p>
				  </div>
				</div>
				<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
				  <p className="text-sm leading-6 text-gray-900">{world.total_c}</p>
				</div>
			  </li>
			))}
		  </ul>
		  </div>
		)
	  }

	return (
		
		<Layout>
			<div>
				<div className="flex flex-col gap-40">
					<div className="flex h-96 justify-between gap-10">
						<div className="flex flex-col gap-3">
							<h1>INPUT</h1>
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
							<h1>OUTPUT</h1>
							<CodeEditor value={outputCode} readOnly />
							{/*output 실제로는 output 코드 떠야 합니다~~*/}
						</div>
					</div>
					<div className="flex h-[800px] justify-between gap-5" style={{ flexShrink: 0 }}>
						<div className="w-72 bg-blue-500">실행 서버 정보</div>
			 			 <Visualize_c></Visualize_c>
						<World_ranking></World_ranking>
					</div>
				</div>
			</div>
		</Layout>
	);
}
