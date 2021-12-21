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
import NavSingleItem2 from '../../components/SidebarNav/components/NavSingleItem2';
import NavDropdownItem from '../../components/SidebarNav/components/NavDropdownItem';
import '../../assets/scss/components/invite.scss'


const Invited = () => {
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
    const targetNo = e.target.name

    const response = await axios.put(`/workspaces/workspace_users`, {
      userNo: authUser.no,
      workspaceNo: e.target.id,
      notiNo: targetNo
    })
    setNoti([...(noti.filter(name => name.no != targetNo))])
  }

  const reject = async (e) => {
    const targetNo = e.target.name
    const response = await axios.delete(`/workspaces/workspace_users/noti?nno=${targetNo}`)
    setNoti([...(noti.filter(name => name.no != targetNo))])
  }

  const NotiList =
    noti.map((e) =>
      <Col md={12}>
        <div className="invitebox">

          <div className="profile_img">
            <span  style={{
                    backgroundImage: `url(${e.profile})`
                    }} />
          </div>
          <h2>{e.contents}</h2>
          <a href='#' onClick={accept} className="yes" id={e.workspaceNo} name={e.no}>수락</a>
          <a href='#' onClick={reject} className="no" id={e.workspaceNo} name={e.no}>거절</a>
        </div>
      </Col>
    )
  


  const navItems = items => {
    
    return items.map((item, index) => itemType(item, index));
  };
  const itemType = (item, index) => {
    console.dir(item)
    if (item.children) {
      if(item.type == 'workspacenoti'){
        return <WorkspaceNotiChildren key={index} item={item} />;
      }else if(item.type == 'invite'){
        return <WorkspaceNotiChildren key={index} item={item}/>;
      }
    } else {
      // alert('dddd')
      console.dir(item)
      return <NavSingleItem2 item={item} key={index} />;
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

      <div className="workinvite">
        <h2>초대된 워크스페이스</h2>

        <Row className="row">
          {NotiList}
        </Row>
      </div>

    </div>
  )
}

export default Invited