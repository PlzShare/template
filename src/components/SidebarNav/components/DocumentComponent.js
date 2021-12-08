import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const DocumentComponent = ({callBackToggle, isOpen}) => {
    return (
        <Modal isOpen={isOpen} toggle={callBackToggle}>
                <ModalHeader toggle={callBackToggle}>문서 에디터</ModalHeader>
                <ModalBody>
                    
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={callBackToggle}>생성하기</Button>{' '}
                  <Button color="secondary" onClick={callBackToggle}>취소하기</Button>
                </ModalFooter>
        </Modal>
    );
};

export default DocumentComponent;