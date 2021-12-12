import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DocumentEditor from './DocumentEditor';
const EditDocument = ({history, match}) => {
    const [document, setDocument] = useState(null)
    const testUrl = `/workspaces/1/channels/4/documents/${match.params.no}`
    
    const fetchDocument = async () => {
        const response = await axios.get(testUrl)
        setDocument(response.data.data)    
    }
    
    useEffect(() => {
        fetchDocument()
    }, [])

    const deleteDoc = async () => {
        await axios.delete(testUrl)
        history.go(-1)
    }
    const onChange = async () => {

    } 
    return (
        <div>
            <button className='btn-primary' onClick={deleteDoc}>삭제</button>
            <DocumentEditor initDocumentData={document} callBackOnChange={onChange}/>
        </div>
    );
};

export default EditDocument;