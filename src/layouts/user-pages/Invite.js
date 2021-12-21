import React, { useContext, useEffect, useState } from 'react';
import { NavLink, } from 'react-router-dom';
import { HeaderNav } from '../DashboardLayout'
import Logo from '../../assets/images/logo3.png';
import axios from 'axios';
import { Row, Col, } from 'reactstrap';
import navlogo from '../../assets/images/logo1.png';
import '../../assets/scss/components/headerNav.scss'
import '../../assets/scss/components/primaryNav.scss'
import UserContext from '../../components/utilities/ContextProviders/UserContext';
import nav from '../../_nav2'
import WorkspaceNotiChildren from '../../components/SidebarNav/components/WorkspaceNotiChildren';
import NavSingleItem from '../../components/SidebarNav/components/NavSingleItem';
import NavDropdownItem from '../../components/SidebarNav/components/NavDropdownItem';

const Invite = () => {
  const [noti, setNoti] = useState([]);
  const { authUser } = useContext(UserContext);
  const logoText = "WeBoard"
  console.log(noti, "sdfsdfsdfsdfsdfsdfsdfsdfs")

  useEffect(() => {
    if (authUser) {
      fetchNotiList();
    }
  }, [authUser]);

  const fetchNotiList = async () => {
    const response = await axios.get(`/noti?uno=${authUser.no}`);
    setNoti([...response.data.data])
  }

  const accept = async (e) => {
    console.log(noti);
    const response = await axios.put(`/workspaces/workspace_users`, {
      userNo: authUser.no,
      workspaceNo: e.target.id,
      notiNo: e.target.name
    })
  }

  const reject = async (e) => {
    const response = await axios.delete(`/workspaces/workspace_users/noti?nno=${e.target.name}`)
  }

  const NotiList =
    noti.map((e) =>
      <Col md={12}>
        <div className="invitebox">
          <div id={e.sender} className="profile_img">
            사진 <img src="" />
          </div>
          <h2>{e.contents}</h2>
          <a href='#' onClick={accept} className="yes" id={e.workspaceNo} name={e.no}>수락</a>
          <a href='#' onClick={reject} className="no" id={e.workspaceNo} name={e.no}>거절</a>
        </div>
      </Col>
    )
  
    const NavBrand = ({ navlogo, logoText }) => {
      return (
        <div className="site-logo-bar">
          <NavLink to={`/worklist`} className="navbar-brand">
            {navlogo && <img src={navlogo} alt="logo" />}
            {logoText && <span className="logo-text">{logoText}</span>}
          </NavLink>
        </div>
      );
    };

  const navItems = items => {
    return items.map((item, index) => itemType(item, index));
  };
  const itemType = (item, index) => {
    if (item.children) {
      if(item.type == 'workspacenoti'){
        return <WorkspaceNotiChildren key={index} item={item} />;
      }else{
        return <NavDropdownItem key={index} item={item}/>;
      }
    } else {
      return <NavSingleItem item={item} key={index} />;
    }
  };

  return (
    <div className='workspaceinvite'>
      <div className="app-sidebar">
        <div className="site-logo-bar">
            <NavLink to={`/worklist`} className="navbar-brand">
              {navlogo && <img src={navlogo} alt="logo" />}
              {logoText && <span className="logo-text">{logoText}</span>}
            </NavLink>
        </div>
        <nav>
          <ul id="main-menu">
            {navItems(nav.top)}
          </ul>
            {/* <div><button>dsfsdf</button></div> */}
          </nav>
      </div>
      <header className="app-header">
        <div className='top-nav'>
          
          <nav className='navbar navbar-expand-md navbar-light bg-faded'>
            <div className='logobox'>
              <NavLink to={`/worklist`}>
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
      </header>


      <h2>초대된 워크스페이스</h2>

      <Row className="row">
        {NotiList}
      </Row>


    </div>

  )
}

export default Invite