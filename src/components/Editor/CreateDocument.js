import React from 'react';
import DocumentEditor from './DocumentEditor';
import axios from 'axios';
const CreateDocument = () => {
    const save = () => {
        const testUrl = '/workspaces/1/channels/10/documents'
        axios.post(testUrl,{
            title:'test Title',
            contents:window.editor.getData(),
            channelNo: 10
        })
        console.log(window.editor.getData())        
    }

    return (
        <div>
            <button className='btn-primary' onClick={save}>저장</button>
            <DocumentEditor/>
        </div>
    ); 
};

export default CreateDocument;