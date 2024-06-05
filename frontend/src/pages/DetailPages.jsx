import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import { useParams } from 'react-router';
import { FaClipboard } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserSection from '@/components/UserSection';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function DetailPages() {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const [beforeCode, setBeforeCode] = useState('');
	const [afterCode, setAfterCode] = useState('');
	const [user, setUser] = useState('');
	const handleInputCopy = () => {
		copyToClipboard(beforeCode);
		toast.success('Copied to clipboard!');
	};
	const handleOutputCopy = () => {
		copyToClipboard(afterCode);
		toast.success('Copied to clipboard!');
	};
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`${BASE_URL}/detail/${id}`)
			.then((res) => {
				setBeforeCode(res.data.before_code);
				setAfterCode(res.data.after_code);
				setUser(res.data.github_id);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);

	return (
		<Layout>
			<Toaster position="top-center" richColors duration={1000} closeButton />
			<div className="flex flex-col">
				<div className="text-[48px] font-extrabold text-lime-800"># {id}</div>
				<div className="flex h-[500px] justify-between gap-20">
					<div>
						<div className="flex items-center justify-between">
							<h1 className="text-xl font-bold text-lime-800">INPUT</h1>
							<Button variant="ghost" onClick={handleInputCopy}>
								<FaClipboard className="size-5 text-lime-800" />
							</Button>
						</div>
						<CodeEditor value={beforeCode} readOnly />
					</div>
					<div>
						<div className="flex items-center justify-between">
							<h1 className="text-lg font-bold text-lime-800">OUTPUT</h1>
							<Button variant="ghost" onClick={handleOutputCopy}>
								<FaClipboard className="size-5 text-lime-800" />
							</Button>
						</div>
						<CodeEditor value={afterCode} readOnly />
					</div>
				</div>
				<div className="flex justify-between">
					<div>
						<h2>실행 서버 정보</h2>
					</div>
					<div>
						<h2>감소량 시각화</h2>
					</div>
					<UserSection user={user} />
				</div>
			</div>
		</Layout>
	);
}
