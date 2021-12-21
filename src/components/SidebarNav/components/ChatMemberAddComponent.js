import React, {useContext, useEffect, useState}  from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router';
import UserContext from '../../utilities/ContextProviders/UserContext';



const ChatMemberAddComponent = ({ctno, callBackToggle, isOpen}) => {
    const [selectdata, setSelectData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [nums, setNums] = useState([]);
    const {authUser} = useContext(UserContext)
    const animatedComponents = makeAnimated();
    const [chatMemberList, setChatMemberList] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetchChatMemberList(); // 채팅방 번호를 기준으로 채팅방 구성원을 불러옴
    }, []);
    
    useEffect(() => {
        chatMemberList && fetchList()
    }, [chatMemberList])

    const fetchChatMemberList = async () => {
        const response = await axios.get(`/workspaces/${params.wno}/chat/${ctno}/findChatMembers`)
        console.log("방구성원")
        console.log(response.data.data) // 방 구성원 불러옴
        setChatMemberList([...response.data.data]) // 챗 맴버 리스트에서 분해
    }

    // 용수가 구분한 구간
    const fetchList = async () => {

        const response = await axios.get(`/workspaces/workspace-users?wno=${params.wno}`)

        response.data.data.forEach(e => {e['label'] = e.userid; e['value'] = e.userid})
        setUserList(response.data.data.filter( el => {
            if(el.userNo == authUser.no) return false; // 워크스페이스 유저랑 본인이랑 같으면 return false

            // 챗멤버리스트(현재 방 구성원)을 필터링.
            if(chatMemberList.filter((member) => member.userNo == el.userNo).length > 0)
                return false;

            return true;
        }))

    }

    const pushData = async() =>{
        
        console.log(userList)
        console.log(ctno)
        const result = (selectdata.map((user) => user.userNo));
        console.log(result);

        await axios.post(`/workspaces/${params.wno}/chat/${ctno}`, {
            chatroomNo: ctno,
            userNums : [...result]
        })
        
        alert("친구가 추가되었습니다!");
        
        // console.log("추가된 친구 정보들");
        // console.log(response.data.data);
        callBackToggle();
    }

    const selectBoxChange = (e) =>{
        // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
        setNums(e);
        setSelectData(e);
    }

    return (
        <Modal isOpen={isOpen} toggle={callBackToggle}>
                <ModalHeader toggle={callBackToggle}>친구 추가</ModalHeader>
                <ModalBody>
                    <div>
                        <h5>🔹 초대할 멤버 아이디</h5>
                        <Select options={userList} components={animatedComponents} isMulti 
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

export default ChatMemberAddComponent;