import React, { Component } from 'react';
import reactFeature from '../assets/images/react-feature.svg';
import sassFeature from '../assets/images/sass-feature.svg';
import bootstrapFeature from '../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';

import '../assets/scss/components/main.scss';

class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    return (
      <div className='workspacemain'>
        <h2>User님의 워크스페이스 목록</h2>
      
        <Row className="row">
          <Col md={12}>
              <div className="workspacebox">
                <h2>워크스페이스 1</h2>
                <a href='none' className="in" >IN</a>
                <a href='none' className="out">OUT</a>

            </div>
          </Col>
        </Row>

        <Row className='workspacemain'>
          <Col md={12}>
              <div className="workspacebox">
                <h2>워크스페이스 2</h2>
                <a href='none' className="in" >IN</a>
                <a href='none' className="out">OUT</a>

            </div>
          </Col>
        </Row>
       
             <Button color="primary" block><i ></i>&nbsp;&nbsp;새로운 워크스페이스 생성</Button>{' '}
              
      </div>
    );
  }
}

export default Dashboard;
