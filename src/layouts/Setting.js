import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../assets/scss/components/setting.scss';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const Setting = () => {
  console.log('=================setting]===================')
  const [selectdata, setSelectData] = useState([]);
  const [userList, setUserList] = useState([]);
  const animatedComponents = makeAnimated();
  const [modals, setModal] = useState(false);
  const wnameInput = useRef();

  const toggle = () => {
    setModal(!modals)

  }

  useEffect(() => {
    fetchList();
  }, []);
  

  // console.dir(userList)
  const fetchList = async () => {
    const response = await axios.get('/workspaces/workspace-users/21/126')
    response.data.data.forEach(e => { e['label'] = e.id; e['value'] = e.id })

    setUserList(response.data.data.filter(el => el.userNo != 21))
    // console.response.data.data
  }

  const updateWorkspaceName = async () => {
    const response = await axios.put('/workspaces/4', {
      no: 125,
      name: wnameInput.current.value
    })
    console.log(wnameInput.current.value)
    changeAdmin();
  }

  const changeAdmin = async () => {
    const response = await axios.put('/workspaces/workspace-users/change-role/25', {
      userNo: selectdata.userNo,
      workspaceNo: 126
    })
  }

  const DeleteWorkspace = async () => {
    const response = await axios.delete('/workspaces/163')
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
