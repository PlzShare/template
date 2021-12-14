import React, { useContext, useEffect } from 'react';
import DocumentEditor from './DocumentEditor';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { WorkSpaceContext } from '../../layouts/DashboardLayout';

const CreateDocument = () => {
    const params = useParams()
    const {setSidebarCollapsed} =  useContext(WorkSpaceContext)
    const navigate = useNavigate()

    const save = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents`
        alert(document.getElementById('document-title').value)
        const response = await axios.post(url,{
            title: document.getElementById('document-title').value,
            contents:window.editor.getData(),
            channelNo: params.cno
        })

        navigate(`/workspace/${params.wno}/channel/${params.cno}`)
    }

    useEffect(() => {
        setSidebarCollapsed(true)
    }, [])

    return (
        <div>
            <button className='btn-primary' onClick={save}>저장</button>
            <DocumentEditor />
        </div>
    ); 
};

export default CreateDocument;