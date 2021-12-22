import React, { useEffect, useState, useRef, useContext } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../assets/scss/components/setting.scss';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router';
import UserContext from '../components/utilities/ContextProviders/UserContext';
import { WorkSpaceContext } from './DashboardLayout';

const Setting = () => {

  const [selectdata, setSelectData] = useState([]);
  const [userList, setUserList] = useState([]);
  const animatedComponents = makeAnimated();
  const [modals, setModal] = useState(false);
  const wnameInput = useRef();
  const params = useParams()
  const {authUser} = useContext(UserContext)
  const {workspaceInfo} = useContext(WorkSpaceContext); 
  const toggle = () => {
    setModal(!modals)

  }

  useEffect(() => {
    if(authUser.no)
      fetchList();
  }, [authUser]);
  useEffect(() => {
    if(workspaceInfo && workspaceInfo.name){
      wnameInput.current.value=workspaceInfo.name
    }
  }, [workspaceInfo])

  // console.dir(userList)
  // 점검 - 확인 부탁
  const fetchList = async () => {

    const response = await axios.get(`/workspaces/workspace-users?wno=${params.wno}`)
    response.data.data.forEach(e => { e['label'] = e.userid; e['value'] = e.userid })

    setUserList(response.data.data.filter(el => el.userNo != authUser.no))
    // console.response.data.data
  }

  const updateWorkspaceName = async () => {
    const response = await axios.put(`/workspaces`, {
      no: params.wno,
      name: wnameInput.current.value
    })
    console.log(wnameInput.current.value)

    changeAdmin();
  }

  const changeAdmin = async () => {
    if(selectdata && selectdata.userNo){
      const response = await axios.put(`/workspaces/workspace-users/change-role`, {
        userNo: selectdata.userNo,
        workspaceNo: params.wno
      })
    }
  }
  
  const DeleteWorkspace = async () => {
    const response = await axios.delete(`/workspaces?wno=${params.wno}`)
    toggle();
  }

  const selectBoxChange = (e) => {
    // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
    console.dir(e)
    setSelectData(e);
  }

  return (
    <div className="add">
      <div className="box">
        <h2 className="firstName">워크스페이스 환경설정</h2>
        <h1 className="secondName">💻 워크스페이스 이름</h1>
        <input ref={wnameInput} className="nameinput" placeholder="변경할 워크스페이스 이름을 입력해주세요."></input>
        <h1 className="secondName">🔒 관리자 권한 변경</h1>
        <div className="nameinput">
          <Select options={userList} components={animatedComponents} onChange={selectBoxChange} />
        </div>
      </div>
      <div className="buttons">
        {/* <Link to='/home'> */}
        <Button color="secondary" size="lg">취소하기</Button>
        {/* </Link> */}
        <Button onClick={updateWorkspaceName} color="primary" size="lg">변경하기</Button>
        <Button color="danger" size="lg" onClick={(e) => {
          e.preventDefault();
          setModal(true);
        }}>
          <Modal isOpen={modals} toggle={toggle}>
            <ModalHeader toggle={toggle}>워크스페이스 삭제</ModalHeader>
            <ModalBody>
              워크스페이스를 삭제하시겠습니까 ?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={DeleteWorkspace}>삭제하기</Button>{' '}
              <Button color="secondary" onClick={toggle}>취소하기</Button>
            </ModalFooter>
          </Modal>삭제하기</Button>
      </div>
    </div>
  );
};

export default Setting;
