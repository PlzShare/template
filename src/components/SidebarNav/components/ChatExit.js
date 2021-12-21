import React, {useContext, useEffect, useState}  from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router';
import UserContext from '../../utilities/ContextProviders/UserContext';


const ChatExit = ({callBackToggle, isOpen, ctno}) => {
    const [selectdata, setSelectData] = useState([]);
    const [userList, setUserList] = useState([]);
    const {authUser} = useContext(UserContext)
    const animatedComponents = makeAnimated();
    const params = useParams();

    useEffect(() => {
        fetchList();
    }, []);
    
    // console.dir(userList)
    const fetchList = async () => {
        const response = await axios.get(`/workspaces/workspace-users?wno=${params.wno}`)
        response.data.data.forEach(e => {e['label'] = e.userid; e['value'] = e.userid})
        setUserList(response.data.data.filter( el => el.userNo != authUser.no))
        // console.response.data.data
    }

    const pushData = async () =>{
        alert("방탈출 성공!")
        await axios.delete(`/workspaces/${params.wno}/chat?ctno=${ctno}`)
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
                <ModalHeader toggle={callBackToggle} />
                <ModalBody>
                    <div>
                        <h3>🔹 채팅방을 나가시겠습니까?</h3>
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={pushData}>나가기</Button>
                  <Button color="secondary" onClick={callBackToggle}>취소하기</Button>
                </ModalFooter>
        </Modal>
    );
};

export default ChatExit;