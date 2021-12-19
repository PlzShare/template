import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Logo from '../assets/images/logo3.png';
import profile from '../assets/images/profile.jpg';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import '../assets/css/worklist.css';
import FontAwesomeIcon from 'react-fontawesome';
import UserContext from '../components/utilities/ContextProviders/UserContext';

const Dashboard = () => {
  const [names, setNames] = useState([]);
  const {authUser} = useContext(UserContext)
  
  useEffect(() => {
    console.log(authUser)
    if(authUser){
      dashBoardManagement.list();
    }
  }, [authUser]);

  const dashBoardManagement = {
    list: async () => {
      const response = await axios.get(`/workspaces?userNo=${authUser.no}`);
      setNames([...response.data.data]);
    },

    leave: async (e) => {
      // 스크롤 이동 막기
      e.preventDefault();

      const deleteNo = e.target.id;
      await axios.delete(`/workspaces/workspace-users?uno=${authUser.no}&wno=${deleteNo}`);

      console.log("삭제한 워크스페이스 번호:" + deleteNo);
      setNames([...(names.filter(name => name.no != deleteNo))])
    }
  }
  
  const outHandler = () => {
    console.log('out!!!!!!!!!!')
  }

  const workspaceLists =
    names.map((e) =>
      <Col className="list" md={12} key={`dashboard_workspaceList_${e.no}`} >
        <div className="workspacebox">
          {/* 제목 눌러도 들어갈 수 있게? */}
          <h3 className='workspace-title'>
            <span to='' id={e.no}>{e.name}</span>
          </h3>
          <NavLink to={`/workspace/${e.no}`} className="in" id={e.no}>IN</NavLink>
          <NavLink to="#" className="out" id={e.no} onClick={dashBoardManagement.leave}>OUT</NavLink>
        </div>
      </Col>
    );

  return (
    <div className='workspacemain'>
      <header className='listheader'>
        <h1><img src={Logo}></img></h1>
        <nav>
          <ul>
            <li className='nav-item'>
              <form className='form-inline'>
                <input className='form-control mr-sm-1'></input>
                <button type='submit' className='d-none d-sm-block btn btn-secondary'>
                  <i className="fa fa-search" />
                </button>
              </form>
            </li>

            <li className='user_box'>
              <div className='profile_box'>
                <img src={profile}></img>
              </div>
              <p>에쿠쿵</p>
            </li>

            <li className='li_bell'>
              <FontAwesomeIcon className='bell' name={'bell'} />
            </li>
          </ul>

        </nav>
      </header>
      <div className='inner'>
        <div className='main'>
          <h2>{authUser.nickname} 님의 워크스페이스 목록</h2>
          <Row className='listrow'>
            {workspaceLists}
          </Row>
          <Link  to='/workspaceadd'>
            <Button className='workadd'to="/workspaceadd" color="primary" block>새로운 워크스페이스 생성</Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
export default Dashboard;