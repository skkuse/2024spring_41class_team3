import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function MainPage() {
	const [inputCode, setInputCode] = useState(''); // input code
	return (
		<Layout>
			<content className="flex flex-col gap-20">
				<div className="flex h-96 justify-between gap-10">
					<div className="flex flex-col">
						<CodeEditor
							value={inputCode}
							onChange={(value) => setInputCode(value)}
						/>
						{/*input*/}
						<div className="flex">
							<div className="flex-1" />
							<Button className="bg-lime-500 hover:bg-lime-600">submit</Button>
						</div>
					</div>
					<div>
						<CodeEditor value="output code will be here" readOnly />
						{/*output 실제로는 output 코드 떠야 합니다~~*/}
					</div>
				</div>
				<div className="flex h-[800px] justify-between gap-5">
					<div className="w-72 bg-blue-500">실행 서버 정보</div>
					<div className="flex-1 bg-yellow-500">감소량 시각화</div>
					<div className="w-72 bg-orange-500">국가별감소량</div>
				</div>
			</content>
		</Layout>
	);
}
