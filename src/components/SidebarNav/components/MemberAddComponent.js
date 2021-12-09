import React, {useEffect, useState}  from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TagsInput from '../../TagsInput'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const MemberAddComponent = ({callBackToggle, isOpen}) => {

    const [selectdata, setSelectData] = useState([]);
    const [userList, setUserList] = useState([]);
    const animatedComponents = makeAnimated();

    const selectedTags = tags => console.log(tags);

    useEffect(() => {
        fetchList();
    },[]);
    
    // console.dir(userList)
    const fetchList = async () => {
        const response = await axios.get('/workspace-users/28')
        response.data.data.forEach(e => {e['label'] = e.id; e['value'] = e.id})
        setUserList(response.data.data)
        // console.response.data.data
    }

    const pushData = () =>{
        console.log(selectdata);
        callBackToggle();
    }


    const selectBoxChange = (e) =>{
        // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
        // console.dir(e)
        setSelectData(e);
    }

    return (
        <Modal isOpen={isOpen} toggle={callBackToggle}>
                <ModalHeader toggle={callBackToggle}>멤버 초대</ModalHeader>
                <ModalBody>
                    <div>
                        <h5>🔹 초대할 멤버 아이디</h5>
                        <TagsInput selectedTags={selectedTags} />
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