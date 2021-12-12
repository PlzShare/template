import React, { useState } from 'react';
import FontAwesomeIcon from 'react-fontawesome';
import ChannelComponent from '../components/SidebarNav/components/ChannelComponent';
import DocumantComponent from '../components/SidebarNav/components/DocumentComponent';
import '../assets/scss/components/workspacemain.scss';

const BlankPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const [isOpenFile, setIsOpenFile] = useState(false)
  const toggleFile = () => {
    setIsOpen(!isOpenFile)
  }
  return (
    <div className='workspacemain'>
        <div className='adds'>
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
  
        </div>
        <ChannelComponent callBackToggle={toggle} isOpen={isOpen}/>
        <DocumantComponent callBackToggle={toggleFile} isOpen={isOpenFile}/>

        <div className='folder'>
                <div className='boxtop'></div>
                <div className='boxbody'>
                    <p> 채널 1</p>
                </div>
        </div>
        <div className='folder'>
            <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
        </div>
    </div>
  );
};

export default BlankPage;
