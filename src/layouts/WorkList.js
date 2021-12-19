import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Button ,Badge ,NavItem , UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Outlet, Routes, Route, useLocation, useParams , useNavigate} from 'react-router'
import { Header, SidebarNav, PageContent, PageAlert, Page } from '../components';
import Logo from '../assets/images/logo3.png';
import profile from '../assets/images/profile.jpg';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import '../assets/css/worklist.css';
import FontAwesomeIcon from 'react-fontawesome';
import UserContext from '../components/utilities/ContextProviders/UserContext';
import {HeaderNav} from './DashboardLayout'
import ContextProviders from '../components/utilities/ContextProviders';

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
      await axios.delete(`/workspaces/workspace-users?uno=${authUser}&wno=${deleteNo}`);

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

    const navigate = useNavigate()
    const clickLogout = () =>{
      
      // console.dir("dndpdpdpdpdpdpdpdpdpdpdpdpdpdpdp");
      // console.dir(token);
      localStorage.removeItem("token");
      // console.dir(token);
  
      navigate('/login');
  
      
    }

  return (
    <div className='workspacemain'>
      <div className='top-nav'>
        <nav className='navbar navbar-expand-md navbar-light bg-faded'>
        <div className='logobox'>
            <NavLink  to={`/worklist`}>
              <img src={Logo}></img>
            </NavLink>
        </div>
          <div className='collapse navbar-collapse'>
            <ul className="ml-auto navbar-nav">
              <HeaderNav />
            </ul>
          </div>
        </nav>
      </div>

      
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
  );
}
export default Dashboard;