import React, { useState, useRef } from 'react';
import '../assets/scss/components/workspaceadd.scss';
import { Button } from 'reactstrap';
import axios from 'axios';

// 게스트북의 WriteForm
const BlankPage = (e) => {
    const refForm = useRef();
    const workspaceManagement = {
        insert: async () => {            
            const testUserNo = 4 // 테스트 넘버
            await axios.post('/workspaces', {
                userNo : testUserNo,
                name : refForm.current.name.value
            })
        }
    }
    return (
        <form className="add" ref={refForm}>
            <h2 className="firstName">워크스페이스 생성하기</h2>
            <h1 className="secondName">💻 워크스페이스 이름</h1>
            <input name="name" className="nameinput" placeholder="워크스페이스 이름을 입력해주세요."></input>
            <h1 className="secondName">💻 멤버 초대</h1>
            <input name="invite" className="nameinput" placeholder="초대할 멤버의 아이디를 입력해주세요."></input>
            <p className="Button">
                <Button color="secondary" size="lg">취소하기</Button>{'      '}
                <Button onClick={workspaceManagement.insert} color="primary" size="lg">생성하기</Button></p>
        </form>
    );
};

export default BlankPage;
