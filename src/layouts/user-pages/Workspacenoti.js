import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import { Row, Col, Button } from 'reactstrap';


export class Workspacenoti extends Component {
    render() {
      return (
        <div className='workspaceinvite'>
        <h2>워크스페이스 1</h2>
      
        <Row className="row">
          <Col md={12}>
              <div className="invitebox">
                <div className="profile_img">
                  사진 <img src="" /> 
                </div>
                <h2>"User4"님이 채널3을 생성하였습니다.</h2>
            </div>
          </Col>
        </Row>

        <Row className="row">
          <Col md={12}>
              <div className="invitebox">
                <div className="profile_img">
                    사진 <img src="" /> 
                </div>
                <h2>"User4"님이 문서를 수정하였습니다.</h2>
            </div>
          </Col>
        </Row>
      </div>

       )
      }
  }
  
  export default Workspacenoti