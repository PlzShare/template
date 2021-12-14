import React, { useState, useRef } from 'react';
import '../assets/scss/components/workspaceadd.scss';
import { Button } from 'reactstrap';
import TagsInput from '../components/TagsInput'
import "../assets/scss/components/tag.scss"
import { Link } from 'react-router-dom';
import axios from 'axios';

// 게스트북의 WriteForm
const WorkspaceAdd = (e) => {

    // test유저
    const testAdminUserNum = 4;
    const nameInput = useRef();
    const [nums, setNums] = useState([]);

    const selectedTags = tags => {
        setNums([testAdminUserNum, ...tags]);
        console.log([testAdminUserNum, ...tags]);
    };

    const createWorkspace = async () => {
        console.log("추가된 유저 번호들~" + [...nums])
        await axios.post('/workspaces', {
            name: nameInput.current.value,
            userNums: [...nums]
        })

        console.log(testAdminUserNum + "번 계정으로 워크스페이스 추가 성공");
    }

    return (
        <div>
            <h2 className="firstName">워크스페이스 생성하기</h2>
            <h1 className="secondName">💻 워크스페이스 이름</h1>
            <input ref={nameInput} name="name" className="nameinput" placeholder="워크스페이스 이름을 입력해주세요."></input>
            <h1 className="secondName">💻 멤버 초대</h1>
                <TagsInput selectedTags={selectedTags} />
            <p className="Button">
                <Link to="/dashboard">
                    <Button color="secondary" size="lg">취소하기</Button>{'      '}
                    <Button onClick={createWorkspace} color="primary" size="lg">생성하기</Button>
                </Link>
            </p>
        </div>
    );
};

export default WorkspaceAdd;