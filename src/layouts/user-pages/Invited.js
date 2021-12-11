import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col} from 'reactstrap';

const Invite = () => {
  const [modals, setModals] = useState(false);
  
  const toggle = () => {
    setModals(!modals)
    
  }
      return (
        <div className='workspaceinvite'>
        <h2>초대한 워크스페이스</h2>
        <Row className="row">
          <Col md={12}>
              <div className="invitebox">
                <div className="profile_img">
                  사진 <img src="" /> 
                </div>
                <h2>"User4"님을  워크스페이스5에 초대하였습니다.</h2>
                <a href='' className="yes" onClick={(e) => {
                  e.preventDefault();
                  setModals(true)
                }}>수락
                <Modal isOpen={modals} toggle={toggle}>
                        <ModalHeader toggle={toggle}></ModalHeader>
                        <ModalBody>
                            수락하시겠습니까 ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>수락하기</Button>{' '}
                            <Button color="secondary" onClick={toggle}>취소하기</Button>
                        </ModalFooter>
                    </Modal></a>
                <a href='' className="no">거절</a>
            </div>
          </Col>
        </Row>

        <Row className="row">
          <Col md={12}>
              <div className="invitebox">
                <div className="profile_img">
                    사진 <img src="" /> 
                </div>
                <h2>"User3"님이  워크스페이스2에 초대하였습니다.</h2>
                <a href='none' className="yes" >수락</a>
                <a href='none' className="no">거절</a>
            </div>
          </Col>
        </Row>
      </div>
       )
      
  }
  
  export default Invite