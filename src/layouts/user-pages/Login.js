import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router'
import {Form} from 'react-bootstrap';
import Sharelogo from '../../assets/images/logo2.png';
import axios from 'axios';
import UserContext from '../../components/utilities/ContextProviders/UserContext';



export default function Login() {

const navigate = useNavigate()

const [Id,setId] = useState("");
const [Password,setPassword] = useState("");
const  {storeToken, authUser} = useContext(UserContext)

// 승현
const client = useRef({});
const [ chatMessages, setChatMessage] = useState([]);
const [ message, setMessage] = useState("");

useEffect(() => {
  chatMessages
  // return () => disconnect();
}, []);


const onIdHandler=(e) =>{
  setId(e.target.value);

}

const onPasswordHandler=(e) =>{
  setPassword(e.target.value);

}

const onLogin = async(e) =>{
    e.preventDefault();

    try{
      //form에서 id랑 password읽어서 
      // axios.post
      const response = await axios.post('/users/login',{
        id: Id,
        password: Password
      })

      //response에서 토큰을 꺼내
      //       console.dir(response.headers.authorization);
      storeToken(response.headers.authorization)
    
      //worklist로 이동
      navigate('/worklist')

    }catch(err){
      console.log(err)
      
      alert('비밀번호가 틀렸습니다')
    }

}

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                   <img src={Sharelogo} alt="logo" /> 
                </div>
            
                <Form onSubmit={onLogin} className="pt-3">
                  {/* <Form.Group className="d-flex search-field">
                    <input  name="id" id="id" type="id" placeholder="아이디" size="lg" className="h-auto" />
                  </Form.Group> */}
                   {/* <Form.Group className="d-flex search-field">
                    <input  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"  name="password" id="password" type="password" placeholder="비밀번호" size="lg" className="h-auto" />
                  </Form.Group> */}
                  <div className="form-group">
                    <input onChange={onIdHandler} value={Id} type="text" className="form-control form-control-lg id" id="id" placeholder="아이디" />
                  </div>
                   <div className="form-group">
                    <input onChange={onPasswordHandler} value={Password} type="password" className="form-control form-control-lg password" id="password" placeholder="비밀번호" />
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">로그인</button>
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/register">회원가입</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  
}
