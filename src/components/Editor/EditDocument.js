import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserContext from '../utilities/ContextProviders/UserContext';
// import DocumentEditor from './DocumentEditor';
import QuillEditor from './QuillEditor';
const EditDocument = ({history, match}) => {
    const params = useParams();
    const [document, setDocument] = useState(null)
    const {authUser} = useContext(UserContext)
    const fetchDocument = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
        const response = await axios.get(url)

        
        setDocument(response.data.data)
    }
    useEffect(() => {
        if(authUser.no){
            console.log('=====================fetchDocument===============')
            console.dir(authUser)
            console.dir(axios.defaults.headers)
            console.log('=====================fetchDocument===============')

            fetchDocument()
        }
    }, [authUser])

    const deleteDoc = async () => {
        // await axios.delete(testUrl)
        history.go(-1)
    }

    const handleChange = (content, delta, source, editor) => {
        console.log('===========delta==============')
        console.dir(delta)

        console.log('===========editor==============')
        console.dir(editor)
    }
    return (
        <div>
            <button className='btn-primary' onClick={deleteDoc}>삭제</button>
            <QuillEditor initDocumentData={document} callBackOnChange={handleChange}/>
            {/* <DocumentEditor initDocumentData={document} callBackOnChange={onChange}/> */}
        </div>
    );
};
export default EditDocument;