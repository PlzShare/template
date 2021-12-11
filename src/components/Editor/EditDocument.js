import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DocumentEditor from './DocumentEditor';
const EditDocument = ({history}) => {
    const [document, setDocument] = useState(null)
    const testUrl = `/workspaces/1/channels/4/documents/2`
    
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
    
    return (
        <div>
            <button className='btn-primary' onClick={deleteDoc}>삭제</button>
            <DocumentEditor initDocumentData={document} />
        </div>
    );
};

export default EditDocument;