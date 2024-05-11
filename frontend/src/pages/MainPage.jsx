import Layout from '@/components/Layout';

export default function MainPage() {
	return (
		<Layout>
			<content className="flex flex-col gap-20">
				<div className="flex justify-between gap-10 h-96">
					<div className="bg-red-400 w-1/2">input area</div>
					<div className="bg-green-400 w-1/2">output area</div>
				</div>
				<div className="flex justify-between gap-5 h-[800px]">
					<div className="bg-blue-500 w-72">실행 서버 정보</div>
					<div className="bg-yellow-500 flex-1">감소량 시각화</div>
					<div className="bg-orange-500 w-72">국가별감소량</div>
				</div>
			</content>
		</Layout>
	);
}
