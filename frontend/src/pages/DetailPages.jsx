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
import { DetailTable } from '@/components/Detailtable';
import ChangedCodeEditor from '@/components/ChangedCodeEditor';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function DetailPages() {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const [beforeCode, setBeforeCode] = useState('');
	const [afterCode, setAfterCode] = useState('');
	const [data, setData] = useState([]);
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
				setData(res.data);
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
					<div className="w-full">
						<div className="flex items-center justify-between">
							<h1 className="text-xl font-bold text-lime-800">INPUT</h1>
							<Button variant="ghost" onClick={handleInputCopy}>
								<FaClipboard className="size-5 text-lime-800" />
							</Button>
						</div>
						<CodeEditor value={beforeCode} readOnly className="w-full" />
						
					</div>
					<div className="w-full">
						<div className="flex items-center justify-between">
							<h1 className="text-lg font-bold text-lime-800">OUTPUT</h1>
							<Button variant="ghost" onClick={handleOutputCopy}>
								<FaClipboard className="size-5 text-lime-800" />
							</Button>
						</div>
						<ChangedCodeEditor beforeCode={beforeCode} afterCode={afterCode} changedLines={data.change_lines} />
					</div>
				</div>
				<div className="mb-10 flex items-center justify-between">
					<UserSection user={user} />
					<DetailTable data={data} />
				</div>
				
			</div>
		</Layout>
	);
}
