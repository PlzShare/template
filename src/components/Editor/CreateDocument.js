import React, { useContext, useEffect } from 'react';
import DocumentEditor from './DocumentEditor';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { WorkSpaceContext } from '../../layouts/DashboardLayout';
import QuillEditor from './QuillEditor';
import UserContext from '../utilities/ContextProviders/UserContext';

const CreateDocument = () => {
    const params = useParams()
    const navigate = useNavigate()

    const save = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents`
        // alert(document.getElementById('document-title').value)
        try{
            const response = await axios.post(url,{
                title: document.getElementById('document-title').value,
                contents: window.qe.root.innerHTML,
                channelNo: params.cno,
                workspaceNo: params.wno,
            })

        }catch(e){
            console.log(e)
        }
        alert('문서가 작성되었습니다.')
        navigate(`/workspace/${params.wno}/channel/${params.cno}`)
    }

    return (
        <div>
            <button className='btn-primary' onClick={save}>저장</button>
            {/* <DocumentEditor /> */}
            <QuillEditor/>
        </div>
    ); 
};

export default CreateDocument;