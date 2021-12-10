import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Logo from '../assets/images/logo3.png';
import profile from '../assets/images/profile.jpg';
import axios from 'axios';
import '../assets/css/worklist.css';
import FontAwesomeIcon from 'react-fontawesome';


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
                      <FontAwesomeIcon className='bell' name={'bell'}/>
                    </li>
                  </ul>

            </nav>
        </header>

        <h2>{testUserNo}번 님의 워크스페이스 목록</h2>
        <Row className='workspacemain'>
          {workspaceLists}
        </Row>
             <Button color="primary" block>새로운 워크스페이스 생성</Button>
      </div>
    );
}
export default Dashboard;