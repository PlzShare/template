import React, { useState, useRef, useContext } from 'react';
import '../assets/scss/components/workspaceadd.scss';
import { Button } from 'reactstrap';
import TagsInput from '../components/TagsInput';
import {HeaderNav} from './DashboardLayout';
import Logo from '../assets/images/logo3.png';
import { Link ,NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router'
import axios from 'axios';
import UserContext from '../components/utilities/ContextProviders/UserContext';
import "../assets/scss/components/tag.scss"

// 게스트북의 WriteForm
const WorkspaceAdd = (e) => {
    const {authUser} = useContext(UserContext)
    const nameInput = useRef();
    const [nums, setNums] = useState([]);
    const navigate = useNavigate()

    const selectedTags = tags => {
        setNums(tags);
        console.log(tags);
    };

    const createWorkspace = async () => {
        console.log("추가된 유저 번호들" + [...nums])
        await axios.post('/workspaces', {
            name: nameInput.current.value,
            userNums: nums,
            userNo: authUser.no,
            inviteMember: authUser.nickname
        })

        console.log("워크스페이스 추가 성공");
        navigate('/worklist')
    }

    return (
        <div className='workadd'>
            <div className='top-nav'>
                <nav className='navbar navbar-expand-md navbar-light bg-faded'>
                    <div className='logobox'>
                    <NavLink  to={`/worklist`}>
                        <img src={Logo}></img>
                    </NavLink>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className="ml-auto navbar-nav">
                            <HeaderNav />
                        </ul>
                    </div>
                </nav>
            </div>

            <div className='add'>
                <h2 className="firstName">워크스페이스 생성하기</h2>

                <h1 className="secondName">💻 워크스페이스 이름</h1>
                <input ref={nameInput} name="name" className="nameinput" placeholder="워크스페이스 이름을 입력해주세요."></input>
                
                <h1 className="secondName">💻 멤버 초대</h1>
                
                <TagsInput selectedTags={selectedTags} />
       
                <p className="button">
                    <Link to="/worklist">
                        <Button color="secondary" size="lg">취소하기</Button>{'      '}
                    </Link>
                    <Button onClick={createWorkspace} color="primary" size="lg">생성하기</Button>
                </p>
            </div>
        </div>
    );
};

export default WorkspaceAdd;