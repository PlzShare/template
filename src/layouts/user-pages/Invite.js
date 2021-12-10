import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import { Row, Col, Button } from 'reactstrap';


export class Invite extends Component {
    render() {
      return (
        <div className='workspaceinvite'>
        <h2>초대된 워크스페이스</h2>
        <Row className="row">
          <Col md={12}>
              <div className="invitebox">
                <div className="profile_img">
                  사진 <img src="" /> 
                </div>
                <h2>"User4"님이  워크스페이스5에 초대하였습니다.</h2>
                <a href='#' className="yes" >수락</a>
                <a href='#' className="no">거절</a>
            </div>
          </Col>
        </Row>

        <Row className="row">
          <Col md={12}>
              <div className="invitebox">
                <div className="profile_img">
                    사진 <img src="" /> 
                </div>
                <h2>"User3"님이  워크스페이스2에 초대하였습니다.</h2>
                <a href='none' className="yes" >수락</a>
                <a href='none' className="no">거절</a>
            </div>
          </Col>
        </Row>
      </div>)
      }
  }
  
  export default Invite