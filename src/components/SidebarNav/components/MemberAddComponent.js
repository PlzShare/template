import React  from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const MemberAddComponent = ({callBackToggle, isOpen}) => {
    const animatedComponents = makeAnimated();

    const Countries = [
        { label: "Albania", value: 355 },
        { label: "Argentina", value: 54 },
        { label: "Austria", value: 43 },
        { label: "Cocos Islands", value: 61 },
        { label: "Kuwait", value: 965 },
        { label: "Sweden", value: 46 },
        { label: "Venezuela", value: 58 }
      ];
    return (
        <Modal isOpen={isOpen} toggle={callBackToggle}>
                <ModalHeader toggle={callBackToggle}>멤버 초대</ModalHeader>
                <ModalBody>
                    <div>
                        <h5>🔹 초대할 멤버 아이디</h5>
                        <Select options={Countries} components={animatedComponents} isMulti 
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={callBackToggle}>초대하기</Button>{' '}
                  <Button color="secondary" onClick={callBackToggle}>취소하기</Button>
                </ModalFooter>
        </Modal>
    );
};

export default MemberAddComponent;