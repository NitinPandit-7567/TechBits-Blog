import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function Editor({ value, onChange }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link'],
            ['clean'],
        ],
    };
    return (
        <div className="content">
            <ReactQuill
                value={value}
                theme={'snow'}
                onChange={onChange}
                modules={modules} />
        </div>
    );
}