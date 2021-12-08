import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import Sharelogo from '../../assets/images/logo2.png';

export class Register extends Component {
   constructor(){
     super(...arguments)

     this.state = {
          id:"" ,
          name: "",
          nickname:"",
          password:"",
          pwdconfirm: ""
     }
      this.refForm = null

    } 
 
    handleSubmit = async(e)=>{
        e.preventDefault();

      // 비밀번호 확인
        if(e.target.pwdconfirm.value == e.target.password.value){
          e.target.password.value = e.target.pwdconfirm.value 
        
            try {
              const response = await fetch('/api/users/join', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  id : e.target.id.value,
                  name : e.target.name.value,
                  nickname : e.target.nickname.value,
                  password : e.target.password.value
                })
              });
              
            } catch(err) {
                  console.error(err);
              }  
      
        }else{
          alert("비밀번호가 일치하지 않습니다.")
          return;
        }
    }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={Sharelogo} alt="logo" /> 
                </div>
              
                <form className="pt-3" onSubmit={this.handleSubmit} ref={(ref) => this.refForm = ref}>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg id" id="id" placeholder="ID"/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg name" id="name" placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg nickname" id="nickname" placeholder="NickName" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg password" id="password" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg pwdconfirm" id="pwdconfirm" placeholder="Password Confirm" />
                  </div>
                  <div className="mb-4">
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" 
                          to="/dashboard"
                          >SIGN UP</button> 
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register