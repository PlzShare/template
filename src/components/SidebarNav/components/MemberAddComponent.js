import React, {useState}  from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const MemberAddComponent = ({callBackToggle, isOpen}) => {
    const [selectdata, setSelectData] = useState();
    const animatedComponents = makeAnimated();

    const pushData = () =>{
        console.log(selectdata);
    }


    const selectBoxChange = (e) =>{
        // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
        console.dir(e)
        setSelectData(e);
    }

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
                        onChange={selectBoxChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={pushData}>초대하기</Button>{' '}
                  <Button color="secondary" onClick={callBackToggle}>취소하기</Button>
                </ModalFooter>
        </Modal>
    );
};

export default MemberAddComponent;