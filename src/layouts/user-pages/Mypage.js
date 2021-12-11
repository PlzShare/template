import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

const Mypage = () => {
    const [user, setUser] = useState({});
    const [imageList, setImageList] = useState([]);
    const refForm = useRef(null);
    const refPassword = useRef(null);
    const refNickname = useRef(null);


    // user 가져오기
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('/users/24')

            setUser(response.data.data)

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])


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
                const response = await axios.put(`/users/24`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // fetch success?
                if (!response.ok) {
                    throw `${response.status} ${response.statusText}`;
                }

                // API success?
                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }

                // re-rendering(update)
                setImageList([json.data, ...imageList]);
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
            setUser(Object.assign({}, user, { profile: reader.result })) //  reader한 결과 가져오기
        }
        // 이벤트가 먹은 타겟의 첫번째 파일(files[0]을 가져와 FileReader의 readAsDataURL을통해 파일의 url을 읽어드린다.)
        reader.readAsDataURL(e.target.files[0]);
    }


    return (
        <div className="outer">
            <h2 className="mypage">마이페이지</h2>

            <div className='folder row'>

                <div className="box_left">
                    <div>
                        <form
                            className="profile"
                            notifyImage={notifyImage}
                            onSubmit={handleSubmit}
                            ref={refForm}
                        >
                            {/* <img src={user.profile} ></img>  */}
                            <span style={{
                                backgroundImage: `url(${user.profile})`
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
                            <input type="text" placeholder="ID" disabled value={user.id} readOnly></input>
                        </div>
                        <div className="password">
                            <p>비밀번호</p>
                            <input ref={refPassword} className="password" type="password" placeholder="비밀번호"></input>
                        </div>
                    </div>
                    <div className="right_bottom">
                        <div className="name">
                            <p>이름</p>
                            <input type="text" placeholder="NAME" disabled value={user.name}></input>
                        </div>
                        <div className="nickname">
                            <p>닉네임</p>
                            <input ref={refNickname} className="nickname" type="text" placeholder={user.nickname}></input>
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
                    }}>수정하기</Button>
                <Button className="secondbutton" color="secondary" >취소하기</Button>
            </div>
        </div>
    );
};

export default Mypage;