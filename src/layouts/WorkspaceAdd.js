import React, { useState, useRef } from 'react';
import '../assets/scss/components/workspaceadd.scss';
import { Button } from 'reactstrap';
import TagsInput from '../components/TagsInput'
import "../assets/scss/components/tag.scss"
import axios from 'axios';

// 게스트북의 WriteForm
const WorkspaceAdd = (e) => {
    const nameInput = useRef();

    const selectedTags = tags => console.log(tags);
    const createWorkspace = async () => {
        const response = await axios.post('/workspaces', {
            name: nameInput.current.value,
            userNo: 4
        })
        console.log("4번 계정에 워크스페이스 추가 성공");
    }

    return (
        <div>
            <h2 className="firstName">워크스페이스 생성하기</h2>
            <h1 className="secondName">💻 워크스페이스 이름</h1>
            <input ref={nameInput} name="name" className="nameinput" placeholder="워크스페이스 이름을 입력해주세요."></input>
            <h1 className="secondName">💻 멤버 초대</h1>
            <TagsInput selectedTags={selectedTags} />
            <p className="Button"><Button color="secondary" size="lg">취소하기</Button>{'      '}<Button onClick={createWorkspace} color="primary" size="lg">생성하기</Button></p>
        </div>
    );
};

export default WorkspaceAdd;
