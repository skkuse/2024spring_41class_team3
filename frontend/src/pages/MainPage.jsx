import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import Server_info from '@/components/Server_info';
import World_ranking from '@/components/World_ranking';
import Visualize_c from '@/components/Visualize_c';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import './MainPage.css';
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
			.post(`${BASE_URL}/api/code`, {
				code: inputCode,
				country: 'Korea', //TODO: FIX with dropdown
			})
			.then((res) => {
				setOutputCode(res.data.after_code);
				setInputEmission(res.data.before_carbon.toFixed(1));
				setOutputEmission(res.data.after_carbon.toFixed(1));
			})
			.finally(setInputFlag(true));
		// 사용자 국가를 조사해 worlddata total_c에 추가
		//임시입니다. 실제로는 서버로 보낸 뒤 받은 코드를 띄워줘야 함
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
						<Server_info />
						<Visualize_c
							inputflag={inputflag}
							inputEmission={inputEmission}
							outputEmission={outputEmission}
						/>
						<World_ranking />
					</div>
				</div>
			</div>
		</Layout>
	);
}
