import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import UserContext from '../../utilities/ContextProviders/UserContext';
import '../../../assets/scss/components/newtype.scss';

import { NavLink, } from 'react-router-dom';
import { HeaderNav } from '../../../layouts/DashboardLayout'
import Logo from '../../../assets/images/logo3.png';
import navlogo from '../../../assets/images/logo1.png';
import nav from '../../../_nav2'
import '../../../assets/scss/components/headerNav.scss'
import '../../../assets/scss/components/primaryNav.scss'
import '../../../assets/scss/components/invite.scss'
import WorkspaceNotiChildren from '../../../components/SidebarNav/components/WorkspaceNotiChildren';
import NavSingleItem2 from '../../../components/SidebarNav/components/NavSingleItem2';


const NewChannels = () => {
  const logoText = "WeBoard"
  const profile = useRef();
  const [nickname, setNicNames] = useState([]);
  const [noti, setNoti] = useState([]);
  const { authUser } = useContext(UserContext);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (authUser) {
      fetchNotiList();
    }
  }, [authUser]);

  const deleteChannelNoti = async (e) => {
    e.stopPropagation();
    console.log(e.target.id)
    const deleteNo = e.target.id
    const response = await axios.delete(`noti?no=${deleteNo}`)
    setNoti([...(noti.filter(name => name.no != deleteNo))])
  }

  const fetchNotiList = async () => {
    const response = await axios.get(`/noti/type?uno=${authUser.no}&type=channel`);
    setNoti([...response.data.data])
    console.log(response.data.data)
  }

  const profileImage = async () => {
    const response = await axios.get(`/noti?sno=${noti.sender}`);
    setNoti([...response.data.data])
  }


  const NotiList =
    noti.map((e) =>
      <Col md={12}>
        <div className="invitebox"
          onMouseEnter={() => setIsShow(true)}
          onMouseLeave={() => setIsShow(false)}>
          <div className="profile_img">
            <span style={{
              backgroundImage: `url(${e.profile})`
            }} />
          </div>
          <h2>{e.contents}</h2>
          {isShow && (
            <button id={e.no} className="channelhover" onClick={deleteChannelNoti}>x</button>
          )}
        </div>
      </Col>
    )

  const navItems = items => {

    return items.map((item, index) => itemType(item, index));
  };
  const itemType = (item, index) => {
    console.dir(item)
    if (item.children) {
      if (item.type == 'workspacenoti') {
        return <WorkspaceNotiChildren key={index} item={item} />;
      } else if (item.type == 'invite') {
        return <WorkspaceNotiChildren key={index} item={item} />;
      }
    } else {
      alert('dddd')
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
        <h2>새로운 채널 추가 알림</h2>

        <Row className="row">
          {NotiList}
        </Row>
      </div>

    </div>

  )
}

export default NewChannels