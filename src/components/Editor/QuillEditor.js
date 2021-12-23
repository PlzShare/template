import ReactQuill from 'react-quill'
import React, { useEffect, useRef} from 'react';
import 'react-quill/dist/quill.snow.css'
import '../../assets/scss/components/quilleditor.scss'

const QuillEditor = (props) => {
    const {callBackOnChange, passEditor, initDocumentData} = props;
    console.dir(props)
    const refQuill = useRef(null)

    const modules = {
        toolbar:{
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
            ]
        } 
    }
     
    const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
    ]

    useEffect(() => {
        window.qe = refQuill.current.getEditor()
        
        if(passEditor)
            passEditor(refQuill.current.getEditor())
    }, [])

    return (
        <div>
            <input id='document-title' type='text' placeholder='문서 제목' style={{width:'100%', fontWeight: 'bold', fontSize: '16px', height: '8vh' }}></input>
            <ReactQuill
                value={initDocumentData? initDocumentData.contents : ''}
                style={{
                    height: '80vh'
                }}
                modules={modules}
                formats={formats}
                ref={refQuill}
                onChange={callBackOnChange}
                 />
        </div>
    );
};

export default QuillEditor;