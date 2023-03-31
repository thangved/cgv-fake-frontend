import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Editor = ({ value = '', onChange = () => {} }) => {
	return (
		<CKEditor
			data={value}
			onChange={(_, editor) => {
				const data = editor.getData();
				onChange(data);
			}}
			editor={ClassicEditor}
		/>
	);
};

export default Editor;
