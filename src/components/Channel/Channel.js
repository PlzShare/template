import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Col, Row } from 'reactstrap';
import ChannelComponent from '../../components/SidebarNav/components/ChannelComponent';
import DocumantComponent from '../../components/SidebarNav/components/DocumentComponent';
import '../../assets/scss/components/workspacemain.scss';
import FontAwesomeIcon from 'react-fontawesome';
import { Link } from 'react-router-dom';
import UserContext from '../utilities/ContextProviders/UserContext';

const Channel = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenFile, setIsOpenFile] = useState(false)
    const [documentList, setDocumentList] = useState([])
    const {authUser} = useContext(UserContext)
    const params = useParams()
    const navigate = useNavigate()
    const onClickDocument = (e) => {
        const docNo = e.currentTarget.getAttribute('doc-no')
        navigate(`/workspace/${params.wno}/channel/${params.cno}/edit-document/${docNo}`)
    }

    const fetchDocumentList = async () => {
        const url = `workspaces/${params.wno}/channels/${params.cno}/documents`
        const response = await axios.get(url)
        setDocumentList(response.data.data)
    }

    useEffect(() => {
        if(authUser.no){
            fetchDocumentList()
        }
    }, [params.cno, authUser])
    const size = 3


    return (
        <div className='workspacemain'>
          {/* <span className='iconbox1' onClick={() => setIsOpen(true)}> 
             <FontAwesomeIcon className='iconfolder' name={'folder'}/>
             <FontAwesomeIcon className='plus' name={'plus'}/>
             <p>채널 추가</p>
          </span> */}
            {/* <ChannelComponent callBackToggle={toggle} isOpen={isOpen} workspaceNo={params.wno}/> */}
            <div className='adds'>
                <Link to={`/workspace/${params.wno}/channel/${params.cno}/create-document`}>
                    <span className='iconbox2' onClick={() => setIsOpenFile(true)}> 
                        <FontAwesomeIcon  className='iconfile' name={'file'}/>
                        <FontAwesomeIcon className='plus' name={'plus'}/>
                        <p>문서 추가</p>
                    </span>
                </Link>
            </div>
            <Row>
                {documentList.map( doc => 
                <Col xl={size} key={doc.no}>
                    <div className='document' doc-no={doc.no} style={{cursor: 'pointer'}} onClick={onClickDocument}>
                        <div className='documentbody'>
                        <div className='triangle'></div>
                        <p style={{fontWeight:'bold'}}>{doc.title}</p>
                        </div>
                    </div>
                </Col>
                )}
          </Row>
        </div>
    );
};

export default Channel;