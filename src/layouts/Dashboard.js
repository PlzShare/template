import React, { Component, useState } from 'react';
import reactFeature from '../assets/images/react-feature.svg';
import sassFeature from '../assets/images/sass-feature.svg';
import bootstrapFeature from '../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import WorkspaceAdd from './WorkspaceAdd';

import '../assets/scss/components/main.scss';

class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    const names = ["리액트", "함수형", "useRef", "useEffect"];
    const workspaceList = names.map((name) =>
      <Col md={12}>
          <div className="workspacebox">
            <h2>{name}</h2>
            <a href='none' className="in" >IN</a>
            <a href='none' className="out">OUT</a>
        </div>
      </Col>
    );

    return (
      <div className='workspacemain'>
        <h2>에쿠쿵 님의 워크스페이스 목록</h2>
        <Row className='workspacemain'>
          {workspaceList}
        </Row>
             <Button color="primary" block><i ></i>&nbsp;&nbsp;새로운 워크스페이스 생성</Button>{' '}
      </div>
    );
  }
}

export default Dashboard;
