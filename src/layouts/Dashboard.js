import React, { useEffect, useState } from 'react';
import reactFeature from '../assets/images/react-feature.svg';
import sassFeature from '../assets/images/sass-feature.svg';
import bootstrapFeature from '../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col, Button, NavItem, Container } from 'reactstrap';
import WorkspaceAdd from './WorkspaceAdd';
import axios from 'axios';
import '../assets/scss/components/main.scss';
import { NavLink } from 'react-router-dom';


const Dashboard = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    dashBoardManagement.list();
  }, []);

  const testUserNo = 4 // 테스트 넘버
  const dashBoardManagement = {
    list: async () => {
      const response = await axios.get(`/workspaces/${testUserNo}`);
      setNames([...response.data.data]);
    },

    leave: async(e) => {
      // 스크롤 이동 막기
      e.preventDefault();

      const deleteNo = e.target.id;
      await axios.delete(`/workspaces/workspace-users/${testUserNo}/${deleteNo}`);

      console.log("삭제한 워크스페이스 번호:" + deleteNo);
      setNames([...(names.filter(name => name.no != deleteNo))])
    }
  }

  const workspaceLists =
    names.map((e) =>
      <Col md={12} key={`dashboard_workspaceList_${e.no}`} >
        <div className="workspacebox">
        {/* 제목 눌러도 들어갈 수 있게? */}
        <h2>
          <NavLink to="#" id={e.no}>{e.name}</NavLink>
        </h2>
          <NavLink to="#" className="in" id={e.no}>IN</NavLink>
          <NavLink to="#" className="out" id={e.no} onClick={dashBoardManagement.leave}>OUT</NavLink>
        </div>
      </Col>
    );

    return (
      <div className='workspacemain'>
        <h2>{testUserNo}번 님의 워크스페이스 목록</h2>
        <Row className='workspacemain'>
          {workspaceLists}
        </Row>
             <Button color="primary" block>새로운 워크스페이스 생성</Button>{' '}
      </div>
    );

}

export default Dashboard;