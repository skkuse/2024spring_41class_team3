import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';

export default function CodeEditor({ value, onChange, readOnly = false }) {
	return (
		<div className="rounded-lg bg-gradient-to-br from-lime-500 to-yellow-300 p-1">
			<CodeMirror
				value={value}
				onChange={onChange}
				height="400px"
				width="650px"
				extensions={[java()]}
				readOnly={readOnly}
				basicSetup={{
					highlightActiveLine: false,
				}}
			/>
		</div>
	);
}
