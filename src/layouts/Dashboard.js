import React, { useEffect, useState } from 'react';
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
      await axios.delete(`/workspace-users/${testUserNo}/${deleteNo}`);

      console.log(deleteNo);
      setNames([...(names.filter(name => name.no != deleteNo))])
    }
  }

  console.log(names)
  const workspaceLists =
    names.map((e) =>
      <Col md={12} key={`dashboard_workspaceList_${e.no}`}>
        <div className="workspacebox">
        <h2>{e.name}</h2>
          <a href='none' className="in" >IN</a>

          {/* <a href='none' className="out" >OUT</a> */}
          <a href='#' className="out" id={e.no} onClick={dashBoardManagement.leave}>OUT</a>

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