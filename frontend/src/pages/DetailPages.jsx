import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { useParams } from 'react-router';
import { FaClipboard } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { useCopyToClipboard } from '@uidotdev/usehooks';

export default function DetailPages() {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const handleCopy = () => {
		copyToClipboard('Hello, world!');
		toast.success('Copied to clipboard!');
	};
	const { id } = useParams();
	return (
		<Layout>
			<Toaster position="top-center" richColors />
			<div className="flex flex-col">
				<div>{id}번째 디테일 페이지입니다.</div>
				<div className="flex h-[500px] justify-between gap-20">
					<div>
						<div className="flex items-center justify-between">
							<h1 className="text-xl font-bold text-lime-800">INPUT</h1>
							<Button variant="ghost" onClick={handleCopy}>
								<FaClipboard className="size-5 text-lime-800" />
							</Button>
						</div>
						<CodeEditor value={`${id}번째 인풋 데이터`} readOnly />
					</div>
					<div>
						<div className="flex items-center justify-between">
							<h1 className="text-lg font-bold text-lime-800">OUTPUT</h1>
							<Button variant="ghost" onClick={handleCopy}>
								<FaClipboard className="size-5 text-lime-800" />
							</Button>
						</div>
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
