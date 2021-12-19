import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../assets/scss/components/main.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

const Dashboard = () => {
  const [names, setNames] = useState([]);
  const params = useParams();

  useEffect(() => {
    dashBoardManagement.list();
  }, []);

  const dashBoardManagement = {
    list: async () => {
      const response = await axios.get(`/workspaces?uno=${params.uno}`);
      setNames([...response.data.data]);
    },

    leave: async (e) => {
      // 스크롤 이동 막기
      e.preventDefault();

      const deleteNo = e.target.id;
      await axios.delete(`/workspaces/workspace-users?uno=${testUserNo}&wno=${deleteNo}`);

      console.log("==============================")
      console.log("현재 테스트 넘버는 " + testUserNo + "입니다. 현재 이 계정은 Admin이므로, 원칙상으로는 워크스페이스 방을 떠날 수 없지만 일단 기능구현을 보여주기 위해 떠날 수 있게 해두었습니다.")
      console.log(testUserNo + "번이 워크스페이스를 떠났어요~! 떠난 워크스페이스 번호는" + deleteNo + "번이랍니다? ㅎ");
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
      <h2>{params.uno}번 님의 워크스페이스 목록</h2>
      <Row>
        {workspaceLists}
      </Row>
      <Link to="/WorkspaceAdd">
          <div className='workadd'>
            <Button color="primary" block>새로운 워크스페이스 생성</Button>
          </div>
      </Link>    
      </div>
  );

}

export default Dashboard;