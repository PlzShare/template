import React, { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-fontawesome';
import ChannelComponent from '../components/SidebarNav/components/ChannelComponent';
import DocumantComponent from '../components/SidebarNav/components/DocumentComponent';
import '../assets/scss/components/workspacemain.scss';
import { Col, Row } from 'reactstrap';
import { Folder } from 'react-feather';
import axios from 'axios';

const BlankPage = ({match}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenFile, setIsOpenFile] = useState(false)
  const [channelList, setChannelList] = useState([])
  const [documentList, setDocumentList] = useState([])

  const workspaceNo = match.params.no
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const toggleFile = () => {
    setIsOpen(!isOpenFile)
  }
  const size=3

  const fetchChannels = async () => {
    const response = await axios.get(`/workspaces/${workspaceNo}/channels`)
    setChannelList(response.data.data)
    console.log(response.data.data)
  }
  const fetchDocument = async () => {
    
  }
  useEffect(() => {
    fetchChannels()
    fetchDocument()
  },[])
  
  return (
    <div className='workspacemain'>
        {/* <div className='adds'>
          <span className='iconbox1' onClick={() => setIsOpen(true)}> 
             <FontAwesomeIcon className='iconfolder' name={'folder'}/>
             <FontAwesomeIcon className='plus' name={'plus'}/>
             <p>채널 추가</p>
          </span>
          <span className='iconbox2' onClick={() => setIsOpenFile(true)}> 
             <FontAwesomeIcon  className='iconfile' name={'file'}/>
             <FontAwesomeIcon className='plus' name={'plus'}/>
             <p>문서 추가</p>
          </span>
        </div> */}
        <ChannelComponent callBackToggle={toggle} isOpen={isOpen} workspaceNo={workspaceNo}/>
        <DocumantComponent callBackToggle={toggleFile} isOpen={isOpenFile}/>

          {/* <Row>
              {channelList.map((channel) => 
                <Col md={size} key={channel.no}>
                  <div className='folder'>
                    <div className='boxtop'></div>
                    <div className='boxbody'>
                      <p>{channel.name}</p>
                    </div>
                  </div>
                </Col>
              )}
            </Row> */}
            <Row>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
              <Col xl={size}>
                  <div className='document'>
                    <div className='documentbody'>
                      <div className='triangle'></div>
                      <p> 문서</p>
                    </div>
                  </div>
              </Col>
             
           
          </Row>
    </div>
  );
};

export default BlankPage;
