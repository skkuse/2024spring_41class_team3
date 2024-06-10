import CodeMirror from '@uiw/react-codemirror';
import { classname } from '@uiw/codemirror-extensions-classname';
import { EditorView } from 'codemirror';
import { java } from '@codemirror/lang-java';

const themeDemo = EditorView.baseTheme({
  '&light .line-color': { backgroundColor: "#E6FFCE" },
});

export default function ChangedCodeEditor({beforeCode, afterCode, changedLines}){
    const classnameExt = classname({
    add: (lineNumber) => {
        if(typeof changedLines !== 'undefined' && changedLines.includes(lineNumber) ){
            return 'line-color';
        }
    
    },
  });

  return <>
  		<div className=" rounded-lg bg-gradient-to-br from-lime-500 to-yellow-300 p-1">
			<CodeMirror
				value={afterCode}
				height="350px"
				width="100%"
				extensions={[java(),classnameExt, themeDemo]}
				readOnly={true}
				basicSetup={{
					highlightActiveLine: false,
				}}
			/>
		</div></>;
}