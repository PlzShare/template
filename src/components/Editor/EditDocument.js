import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DocumentEditor from './DocumentEditor';
const EditDocument = ({history, match}) => {
    const params = useParams();
    const [document, setDocument] = useState(null)
    const [editorData, setEditorData] = useState(null)

    const fetchDocument = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
        const response = await axios.get(url)

        return response.data.data;
        
    }
    
    useEffect(async () => {
        const documentData = await fetchDocument()
        setEditorData(documentData) 
        setDocument(documentData)
    }, [])

    const deleteDoc = async () => {
        // await axios.delete(testUrl)
        history.go(-1)
    }
    const onChange = async () => {
        // setEditorData((prevData) => {
        //     if(prevData == window.editor.getData())
            
        //     return window.editor.getData()
        // })
    } 
    return (
        <div>
            <button className='btn-primary' onClick={deleteDoc}>삭제</button>
            <DocumentEditor initDocumentData={document} callBackOnChange={onChange}/>
        </div>
    );
};

export default EditDocument;