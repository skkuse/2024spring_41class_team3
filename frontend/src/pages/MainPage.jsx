import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';

export default function MainPage() {
	const [inputCode, setInputCode] = useState(''); // input code
	const [outputCode, setOutputCode] = useState(''); // output code
	const onSubmitButtonClick = () => {
		// submit 버튼 눌렀을 때 동작하는 함수
		// inputCode를 서버로 보내고, 결과를 받아와서 outputCode에 저장하는 코드
		setOutputCode(inputCode);
		//임시입니다. 실제로는 서버로 보낸 뒤 받은 코드를 띄워줘야 함
	};
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
					<div className="flex h-[800px] justify-between gap-5">
						<div className="w-72 bg-blue-500">실행 서버 정보</div>
						<div className="flex-1 bg-yellow-500">감소량 시각화</div>
						<div className="w-72 bg-orange-500">국가별감소량</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
