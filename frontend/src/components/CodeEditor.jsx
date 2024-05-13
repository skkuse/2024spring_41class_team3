import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

export default function CodeEditor({ value, onChange, readOnly = false }) {
	return (
		<CodeMirror
			value={value}
			onChange={onChange}
			height="400px"
			width="600px"
			extensions={[java()]}
			readOnly={readOnly}
		/>
	);
}
