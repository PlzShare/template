import React, { useEffect, useRef, useState } from 'react';
import {Button} from 'reactstrap';
import profile from '../../assets/images/profile.jpg';

 const Mypage = () => {
    const[user,setUser] = useState({});

    // user 가져오기
    const fetchUserInfo = async () =>{
        try{
            const response = await fetch('/api/users/24',{
                method: 'get',
                header: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: null
            })

            const result = await response.json()

            setUser(result.data)

            console.dir(result.data)

        }catch (err){
            console.error(err);
        }
    }
    
    useEffect(() =>{
        fetchUserInfo()
    },[])


  return (
    <div className="outer">
        <h2 className="mypage">마이페이지</h2>

        <div className='folder row'>

          <div className="box_left">
            <div className="profile">
                <img src={profile}></img>
                <input> 
                        {/* // ref={imgInput}
                        // className="imgInput" 
                        // type="file" 
                        // accept="image/*" 
                        // ref={imgInput} 
                        // id="imgInput" 
                        // name="file"
                        // onChange={onImgChange}  */}
                </input>
            </div>
                <div className="btns">
                    <Button className="firstbutton" color="success" >생성하기</Button>
                    <Button className="secondbutton" color="secondary" >취소하기</Button>
                </div >
          </div>
            
            <div className="box_right">
              <div className="right-top">
                  <div className="id">
                      <p>아이디</p>
                      <input type="text" placeholder="ID" disabled value={user.id} readOnly></input>
                  </div>
                  <div className="password">
                      <p>비밀번호</p>
                      <input className="password" type="password" placeholder="PASSWORD"></input>
                  </div>
              </div>
              <div className="right_bottom">
                  <div className="name">
                      <p>이름</p>
                      <input type="text" placeholder="NAME" disabled value={user.name}></input>
                  </div>
                  <div className="nickname">
                      <p>닉네임</p>
                      <input className="nickname" type="text" placeholder={user.nickname}></input>
                  </div>
              </div>

            </div>
        
        </div>
        <div className="btn_bottom">
            <Button className="firstbutton" color="primary">수정하기</Button>
            <Button className="secondbutton" color="secondary" >취소하기</Button>
        </div>
    </div>
  );
};

export default Mypage;