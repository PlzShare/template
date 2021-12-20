import React, { useState, useRef, useEffect, useContext } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../../assets/scss/components/chatadd.scss';
import TagsInput from '../../TagsInput'
import UserContext from '../../utilities/ContextProviders/UserContext';

const ChatMemberAddComponent = ({callBackToggle, isOpen}) => {
    const {authUser} = useContext(UserContext);
    const nameInput = useRef();
    const params = useParams()
    const [selectdata, setSelectData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [nums, setNums] = useState([]);
    const animatedComponents = makeAnimated();
    const navigate = useNavigate()

    useEffect(() => {
        fetchList();
    }, []);
    
    // console.dir(userList)
    const fetchList = async () => {
        const response = await axios.get(`/workspaces/workspace-users?wno=${params.wno}&uno=${params.uno}`)
        response.data.data.forEach(e => {e['label'] = e.userid; e['value'] = e.userid})
        setUserList(response.data.data.filter( el => el.userNo != authUser.no))
        
    }

    const selectBoxChange = (e) =>{
        // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
        // console.dir(e)
        setNums(e);
        setSelectData(e);
    }

    // const selectedTags = tags => {
    //     setNums([authUser.no, ...tags]);
    // };

    const createWorkspace = async () => {
        const result = (selectdata.map((user) => user.userNo));
        console.log(result);
        const response = await axios.post(`/workspaces/${params.wno}/chat`, {
            name: nameInput.current.value,
            workspaceNo : params.wno,
            userNums : [...result, authUser.no]
        })
        
        console.log("방 정보(방 만들 때 바로 그 방으로 들어갈 수 있게 정보를 남깁니다.) : ");
        console.log(response.data.data);
        callBackToggle();
    }

    return (
        <Modal isOpen={isOpen} toggle={callBackToggle}>
                <ModalHeader toggle={callBackToggle}>채팅 생성</ModalHeader>
                <ModalBody>
                    <div>
                        <h5>🔹 초대할 멤버 아이디</h5>
                        <Select className="selectbox" options={userList} components={animatedComponents} isMulti 
                        onChange={selectBoxChange} />
                    </div>

                    <div>
                        <h5>🔹 채팅방 이름</h5>
                        <input ref={nameInput} name="name" className="nameinput" placeholder='채팅방 이름을 입력해주세요' className="chatinput" ></input>

                    </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={createWorkspace}>초대하기</Button>{' '}
                  <Button color="secondary" onClick={callBackToggle}>취소하기</Button>
                </ModalFooter>
        </Modal>
    );
};

export default ChatMemberAddComponent;