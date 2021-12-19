import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import Logo from '../../assets/images/logo3.png';
import {HeaderNav} from '../DashboardLayout'
import UserContext from '../../components/utilities/ContextProviders/UserContext';
import { NavLink, Link } from 'react-router-dom';
import '../../assets/scss/components/mypage.scss';

const Mypage = () => {
    const {authUser, storeToken} = useContext(UserContext);
    const [User, setUser] = useState({});
    const refForm = useRef(null);
    const refPassword = useRef(null);
    const refNickname = useRef(null);

    // user 가져오기
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`/users?uno=${authUser.no}`)

            setUser(response.data.data)

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(authUser.no)
            fetchUserInfo()
    }, [authUser])

    // 이미지 업로드
    const notifyImage = {
        add: async function (file) {
            try {
                // Create FormData
                const formData = new FormData();

                formData.append('file', file);
                formData.append('password', refPassword.current.value)
                formData.append('nickname', refNickname.current.value)

                // Post
                const response = await axios.put(`/users?uno=${authUser.no}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });


                // re-rendering(update)
                storeToken(response.headers.authorization)
            } catch (err) {
                console.error(err);
            }
        }
    }

    const handleSubmit = function (e) {
        e.preventDefault();

        // Validation
        const file = e.target['uploadImage'].files[0];
        notifyImage.add(file);
    }

    // 이미지 미리보기 
    const hadleImageFile = (e) => {

        let reader = new FileReader();
        reader.onload = () => {
            setUser(Object.assign({}, User, { profile: reader.result })) //  reader한 결과 가져오기
        }
        // 이벤트가 먹은 타겟의 첫번째 파일(files[0]을 가져와 FileReader의 readAsDataURL을통해 파일의 url을 읽어드린다.)
        reader.readAsDataURL(e.target.files[0]);
    }


    return (
        <div className="outer">
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

            <div className='folder row'>
                <h2>🔷 마이페이지</h2>
                <div className="box_left">
                    <div>
                        <form
                            className="profile"
                            notifyImage={notifyImage}
                            onSubmit={handleSubmit}
                            ref={refForm}
                        >
                            <span style={{
                                backgroundImage: `url(${User.profile})`
                            }} />
                            <input
                                type={'file'}
                                name={'uploadImage'}
                                placeholder={'이미지(사진)'}
                                onChange={hadleImageFile} />
                        </form>
                    </div>
                </div>

                <div className="box_right">
                    <div className="right-top">
                        <div className="id">
                            <p>아이디</p>
                            <input type="text" placeholder="ID" disabled value={authUser.id} readOnly></input>
                        </div>
                        <div className="password">
                            <p>비밀번호</p>
                            <input ref={refPassword} className="password" type="password" placeholder="비밀번호"></input>
                        </div>
                    </div>
                    <div className="right_bottom">
                        <div className="name">
                            <p>이름</p>
                            <input type="text" placeholder="NAME" disabled value={authUser.name}></input>
                        </div>
                        <div className="nickname">
                            <p>닉네임</p>
                            <input ref={refNickname} className="nickname" type="text" placeholder={authUser.nickname}></input>
                        </div>
                    </div>

                </div>

            </div>
            <div className="btn_bottom">
                <Button
                    className="firstbutton"
                    color="primary"
                    onClick={() => {
                        refForm.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                    }}>
                        <NavLink className='navlink' to={`/worklist`}>
                            수정하기
                        </NavLink>
                </Button>
                <Button className="secondbutton" color="secondary" >
                    <NavLink className='navlink' to={`/worklist`}>
                        취소하기
                    </NavLink>
                
                </Button>
            </div>
        </div>
    );
};

export default Mypage;