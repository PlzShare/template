import React, { useEffect, useState, useRef } from 'react';
import reactFeature from '../assets/images/react-feature.svg';
import sassFeature from '../assets/images/sass-feature.svg';
import bootstrapFeature from '../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col, Button, Container } from 'reactstrap';
import WorkspaceAdd from './WorkspaceAdd';
import axios from 'axios';
import '../assets/scss/components/main.scss';

const Dashboard = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    dashBoardManagement.list();
  }, []);

  // 아무리 해도 @RequestBody 방식으로 몬하것어서
  const dashBoardManagement = {
    list: async () => {
      const testUserNo = 4 // 테스트 넘버
      const response = await axios.get(`/workspaces/${testUserNo}`)
      setNames(response.data.data.map(x => [x.no, x.name]));
    },

    // leave: async(e) => {
    //   const response = await axios.leave(`/workspaces/${e.target.id}`)
    //   console.dir(e.target)
    //   setNames(names.filter(el => el.no != e.target.id))
    // }
  }

  const workspaceLists =
    names.map(([no, name]) =>
      <Col md={12}>
        <div className="workspacebox">
        <h2>{name}</h2>
          <a href='none' className="in" >IN</a>
          <a href='none' className="out" >OUT</a>
          {/* <a href='#' className="out" id={no} onClick={dashBoardManagement.leave}>OUT</a> */}
        </div>
      </Col>
    );
    return (
      <div className='workspacemain'>
        <h2>에쿠쿵 님의 워크스페이스 목록</h2>
        <Row className='workspacemain'>
          {workspaceLists}
        </Row>
             <Button color="primary" block>새로운 워크스페이스 생성</Button>{' '}
      </div>
    );

}

export default Dashboard;