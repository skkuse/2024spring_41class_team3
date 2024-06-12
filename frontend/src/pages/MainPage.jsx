import Layout from '@/components/Layout';
import CodeEditor from '@/components/CodeEditor';
import Server_info from '@/components/Server_info';
import World_ranking from '@/components/World_ranking';
import Visualize_c from '@/components/Visualize_c';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import './MainPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { FaClipboard } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { countryFlag } from '@/components/countryFlag';
import ChangedCodeEditor from '@/components/ChangedCodeEditor';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function MainPage() {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const [inputCode, setInputCode] = useState(''); // input code
	const [outputCode, setOutputCode] = useState(''); // output code
	const [selectedCountry, setSelectedCountry] = useState(null); // selected country
	const [inputFlag, setInputFlag] = useState(false);
	const [inputEmission, setInputEmission] = useState(0.0);
	const [outputEmission, setOutputEmission] = useState(0.0);
	const [loading, setLoading] = useState(false); // State to manage loading indicator
	const [submitCount, setSubmitCount] = useState(0);
	const [change_lines, setChangeLines] = useState([]);

	const verifyGitHubUsername = async (username) => {
		try {
			const response = await axios.get(
				`https://api.github.com/users/${username}`,
			);
			return response.status === 200;
		} catch (error) {
			return false;
		}
	};

	const handleOutputCopy = () => {
		if (outputCode) {
			copyToClipboard(outputCode);
			toast.success('Copied to clipboard!');
		} else {
			toast.error('No output code to copy!');
		}
	};
	const onSubmitButtonClick = async () => {
		if (!inputCode.trim()) {
			Swal.fire('ERROR', 'Input your code.', 'error');
			return;
		}

		if (!selectedCountry) {
			Swal.fire('ERROR', 'Select your country.', 'error');
			return;
		}

		setLoading(true);

		const submitButton = document.getElementById('submitBtn');

		if (submitButton) {
			submitButton.disabled = true;
		}

		axios
			.post(`${BASE_URL}/code`, {
				code: inputCode,
				country: selectedCountry,
			})
			.then(async (res) => {
				setOutputCode(res.data.after_code);
				setInputEmission(res.data.before_carbon.toFixed(1));
				setOutputEmission(res.data.after_carbon.toFixed(1));
				setSubmitCount((prev) => prev + 1);
				setChangeLines(res.data.change_lines);

				const { value: makePublic } = await Swal.fire({
					title: 'PUBLISH CODE IN BULLETIN',
					text: 'Would you like to make your code public?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, I do',
					cancelButtonText: 'No, It is private',
				});

				if (makePublic) {
					const result = await Swal.fire({
						title: 'Input your GitHub ID',
						input: 'text',
						inputPlaceholder: 'Input your GitHub ID',
						showCancelButton: true,
						cancelButtonText: 'Publish it anonymously',
					});

					const githubId =
						result.isConfirmed && result.value ? result.value : null;
					const anonymous = !result.isConfirmed;

					if (githubId) {
						const isValidGitHubId = await verifyGitHubUsername(githubId);
						if (!isValidGitHubId) {
							await Swal.fire('ERROR', 'Invalid GitHub ID', 'error');
							setLoading(false);
							return;
						}
					}

					axios
						.post(`${BASE_URL}/sharing`, {
							code_id: res.data.code_id,
							anonymous,
							github_id: githubId,
						})
						.then((response) => {
							if (response.data.success === 200) {
								Swal.fire(
									'SUCCESS',
									'Your code has been published successfully.',
									'success',
								);
							} else {
								Swal.fire(
									'ERROR',
									'There was a problem publishing your code.',
									'error',
								);
							}
						})
						.catch((error) => {
							console.error(error);
							Swal.fire(
								'ERROR',
								'There was a problem publishing your code.',
								'error',
							);
						});
				}
			})
			.catch((error) => {
				console.error(error);
				Swal.fire(
					'ERROR',
					'There was a problem submitting your code.',
					'error',
				);
			})
			.finally(() => {
				setInputFlag(true);
				setLoading(false);
				if (submitButton) {
					submitButton.disabled = false;
				}
			});
	};

	const countryObject = Object.entries(countryFlag);

	const countryOptions = countryObject.map(([country, img]) => (
		<SelectItem key={country} value={country} className="flex items-center">
			<img src={img} alt={country} className="mr-5 inline-block h-5 w-5"></img>
			<span className="inline-block">{country}</span>
		</SelectItem>
	));

	const deleteCode = () => {
		setInputCode('');
		setOutputCode('');
	};

	return (
		<Layout>
			<>
				<Toaster position="top-center" richColors duration={1000} closeButton />
				<div className="flex flex-col gap-40">
					<div className="flex h-96 w-full justify-center gap-10">
						<div className="flex w-1/2 flex-col gap-2">
							<div className="flex items-center justify-between">
								<h1 className="text-xl font-bold text-lime-800">INPUT</h1>
								<Button variant="ghost" onClick={deleteCode}>
									<FaRegTrashAlt className="size-5 text-lime-800" />
								</Button>
							</div>
							<CodeEditor
								value={inputCode}
								onChange={(value) => setInputCode(value)}
							/>

							<div className="flex">
								<div className="flex-1" />
								<Select onValueChange={(value) => setSelectedCountry(value)}>
									<SelectTrigger>
										<SelectValue
											placeholder="Select your country"
											className="text-gray-500"
										/>
										<SelectContent>{countryOptions}</SelectContent>
									</SelectTrigger>
								</Select>
								<Button
									id="submitBtn"
									onClick={onSubmitButtonClick}
									className="ml-5 bg-lime-500 hover:bg-lime-600"
									disabled={loading} // Disable button when loading
								>
									{loading ? (
										<FaSpinner className="mr-2 animate-spin" />
									) : (
										'submit'
									)}
								</Button>
							</div>
						</div>
						<div className="flex w-1/2 flex-col gap-2">
							<div className="flex items-center justify-between">
								<h1 className="text-xl font-bold text-lime-800">OUTPUT</h1>
								<Button variant="ghost" onClick={handleOutputCopy}>
									<FaClipboard className="size-5 text-lime-800" />
								</Button>
							</div>
							<ChangedCodeEditor
								afterCode={outputCode}
								changedLines={change_lines}
							/>
						</div>
					</div>
					<div className="flex h-[800px] w-full justify-between gap-5">
						<Server_info />
						<Visualize_c
							inputFlag={inputFlag}
							inputEmission={inputEmission}
							outputEmission={outputEmission}
						/>
						<World_ranking submitCount={submitCount} />
					</div>
				</div>
			</>
		</Layout>
	);
}
