import React, {useContext, useEffect, useState}  from 'react';
import TagsInput from '../../TagsInput'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WorkSpaceContext } from '../../../layouts/DashboardLayout';
import { useParams } from 'react-router';
import UserContext from '../../utilities/ContextProviders/UserContext';


const MemberAddComponent = ({callBackToggle, isOpen}) => {

    const [selectdata, setSelectData] = useState([]);
    // const [userList, setUserList] = useState([]);
    const {pushMemberList} = useContext(WorkSpaceContext)
    const {authUser} = useContext(UserContext);
    const selectedTags = tags => setSelectData(tags);
    const params = useParams();

    const pushData = async () =>{
        console.log(selectdata);
        const response = await axios.post(`/workspaces/workspace-users`,{
            no : params.wno,
            userNo: authUser.no,
            userNums : selectdata,
            inviteMember : authUser.nickname
        })
        // pushMemberList()
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