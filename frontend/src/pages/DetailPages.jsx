import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { useParams } from 'react-router';

export default function DetailPages() {
	const { id } = useParams();
	return (
		<Layout>
			<div className="flex flex-col">
				<div>{id}번째 디테일 페이지입니다.</div>
				<div className="flex h-[500px] justify-between gap-20">
					<div>
						<h1>INPUT</h1>
						<CodeEditor value={`${id}번째 인풋 데이터`} readOnly />
					</div>
					<div>
						<h2>OUTPUT</h2>
						<CodeEditor value={`${id}번째 아웃풋 데이터`} readOnly />
					</div>
				</div>
				<div className="flex justify-between">
					<div>
						<h2>실행 서버 정보</h2>
					</div>
					<div>
						<h2>감소량 시각화</h2>
					</div>
					<div>유저 정보</div>
				</div>
			</div>
		</Layout>
	);
}
