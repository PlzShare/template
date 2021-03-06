import React, { useContext, useEffect, useRef, useState } from 'react';
import FontAwesomeIcon from 'react-fontawesome';
import ChannelComponent from '../components/SidebarNav/components/ChannelComponent';
import DocumantComponent from '../components/SidebarNav/components/DocumentComponent';
import '../assets/scss/components/workspacemain.scss';
import { Col, Row } from 'reactstrap';
import { Folder } from 'react-feather';
import axios from 'axios';
import { WorkSpaceContext } from './DashboardLayout';
import { useNavigate, useParams } from 'react-router';
const WorkspaceMain = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenFile, setIsOpenFile] = useState(false)
  const [documentList, setDocumentList] = useState([])
  const [channels, setChannels] = useState([]);
  const {channelList} = useContext(WorkSpaceContext)
  const {fetchChannelList} = useContext(WorkSpaceContext)
  const [isShow, setIsShow] = useState(false);
  const params = useParams()
  const workspaceNo = params.wno
  
  const navigate = useNavigate()
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const toggleFile = () => {
    setIsOpen(!isOpenFile)
  }
  const onClickFolder = (e) => {
    const channelNo = e.currentTarget.getAttribute('channel-no')
    navigate(`/workspace/${params.wno}/channel/${channelNo}`)
  }

  const deleteChannel = async (e) => {
    e.stopPropagation();
    const deleteNo = e.target.id
    await axios.delete(`workspaces/${params.wno}/channels/${deleteNo}`)
    setChannels([...(channelList.filter(name => name.no != deleteNo))])
    }

  const size=3

  // const fetchWorkspaceInfo = async () => {
  //   const response = await axios.get(`/workspaces/${workspaceNo}`)
  //   console.log('=========================================')
  //   console.dir(response)
  //   setWorkspaceInfo(response.data.data)

  

  useEffect(() => {

    let timer = setInterval(() => {
      if(axios.defaults.headers && axios.defaults.headers['Authorization']){
        fetchChannelList()
        clearInterval(timer)
      }
    }, 200)
  },[channels])
  
  return (
    <div className='workspacemain'>
          {/* <span className='iconbox2' onClick={() => setIsOpenFile(true)}> 
             <FontAwesomeIcon  className='iconfile' name={'file'}/>
             <FontAwesomeIcon className='plus' name={'plus'}/>
             <p>?????? ??????</p>
          </span> */}
        <div className='adds'>
          <span className='iconbox1' onClick={() => setIsOpen(true)}> 
             <FontAwesomeIcon className='iconfolder' name={'folder'}/>
             <FontAwesomeIcon className='plus' name={'plus'}/>
             <p>?????? ??????</p>
          </span>
        </div>
        <ChannelComponent callBackToggle={toggle} isOpen={isOpen} workspaceNo={workspaceNo}/>
        {/* <DocumantComponent callBackToggle={toggleFile} isOpen={isOpenFile}/> */}

          <Row>
              {channelList.map((channel) => 
                <Col md={size} key={channel.no}>
                  <div className='folder' onClick={onClickFolder} channel-no={channel.no} style={{cursor: 'pointer'}}>
                    <div className='boxtop'></div>
                    <div
                    className='boxbody'
                    onMouseEnter={() => setIsShow(true)}
                    onMouseLeave={() => setIsShow(false)}>
                      <p>{channel.name}
                      </p>
                      {isShow && (
                        <button id={channel.no} className="hover" onClick={deleteChannel}>x</button>
                      )}
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            {/* <Row>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> ??????</p>
                    </div>
                  </div>
              </Col>
              
             
           
          </Row> */}
    </div>
  );
};

export default WorkspaceMain;
