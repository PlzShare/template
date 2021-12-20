import React, { Children, Component, createContext, Fragment ,useContext} from 'react';
import { NavLink, BrowserRouter as Router, Link } from 'react-router-dom';
import { Outlet, Routes, Route, useLocation, useParams , useNavigate} from 'react-router'
import { Button, Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, PageContent, PageAlert, Page } from '../components';
import UserContext from '../components/utilities/ContextProviders/UserContext';
import Logo from '../assets/images/vibe-logo.svg';
import '../assets/css/dashboardlayout.css';

// import nav from '../_nav3';    // 채널scrollable sidebar sidebar-right
import nav from '../_nav3';   // 알림
// import nav from '../_nav3';     // 워크스페이스

import routes from '../router';
import ContextProviders from '../components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../helpers/handleTabAccessibility';
import ConversationList from '../components/Messenger/ConversationList'
import MessageList from '../components/Messenger/MessageList';
import Setting from './Setting';
import axios from 'axios';

// import ToggleSidebarButton from '../vibe/components/ToggleSidebarButton';
const MOBILE_SIZE = 992;

export const WorkSpaceContext = createContext();

class DashboardLayout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      conversationListCollapsed: true,
      chatRoomCollapsed: true,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
      workspaceInfo : null,
      channelList: [],
      memberList: [],
      chatRoomInfo : null
    };

    console.log('=====================dashboard=========================')
    console.dir(this.props)
    
  }

  fetchChannelList = async () => {
    const response = await axios.get(`/workspaces/${this.props.params.wno}/channels`)
    response.data.data.forEach((channel) => channel.url = `/channel/${channel.no}`);
    this.setState({channelList:response.data.data})
    console.dir(response.data.data)
  }
  
  pushChannelList = (channel) => {
    channel.url = `/channel/${channel.no}`
    this.setState({channelList : [...this.state.channelList, channel]})
  }

  fetchWorkspaceInfo = async () => {
    const response = await axios(`/workspaces/${this.props.params.wno}`)
    console.dir(response.data)
    this.setState({workspaceInfo: response.data.data})
  }

  fetchMemberList = async () => {
    const response = await axios.get(`/workspaces/workspace-users?wno=${this.props.params.wno}`)
    response.data.data.forEach((user) => {user.url = `/member/${user.userNo}`; user.name=user.nickname;});
    this.setState({memberList: response.data.data})
  }

  pushMemberList = (member) => {
    this.setState({memberList : [...this.state.memberList, member]})
  }

  // setWorkspaceInfo = (workspace) => {
  //   this.setState({workspaceInfo : workspace})
  // }

  setSidebarCollapsed = (sidebarCollapsed) => {
    this.setState({sidebarCollapsed : sidebarCollapsed})
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
    
    let timer = setInterval(() => {
      if(axios.defaults.headers && axios.defaults.headers['Authorization']){
        this.fetchWorkspaceInfo()
        this.fetchChannelList()
        this.fetchMemberList()
        clearInterval(timer)
      }
    }, 200)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  toggleConversationList = () => {
    console.log('toggle')
    this.setState(prevState => ({ conversationListCollapsed: !prevState.conversationListCollapsed }))
  }
  
  enterChatRoom = (e) => {
    this.setState({ 
      conversationListCollapsed: true,
      chatRoomCollapsed: false,
      chatRoomInfo : {roomNo:e.currentTarget.id, name: e.currentTarget.getAttribute('name')}
    })
  }

  exitChatRoom = () => {
    console.log('exit')
    this.setState({ conversationListCollapsed: false })
    this.setState({ chatRoomCollapsed: true })
  }


  render() {
    const { sidebarCollapsed, conversationListCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    const chatRoomCollapsed = this.state.conversationListCollapsed == false || this.state.chatRoomCollapsed == false ? 'side-menu-right' : '';
    return (
      <ContextProviders>
        <WorkSpaceContext.Provider value={{
            workspaceInfo : this.state.workspaceInfo || {}, 
            setWorkspaceInfo : this.setWorkspaceInfo,
            channelList : this.state.channelList,
            memberList : this.state.memberList,
            pushMemberList : this.pushMemberList,
            pushChannelList : this.pushChannelList, 
            setSidebarCollapsed : this.setSidebarCollapsed
          }}>
          <div className={`app ${sidebarCollapsedClass} ${chatRoomCollapsed}`}>
            <PageAlert />
            <div className="app-body">
              <SidebarNav
                nav={nav}
                logo={Logo}
                logoText="WeBoard"
                isSidebarCollapsed={sidebarCollapsed}
                toggleSidebar={this.toggleSideCollapse}
                {...this.props}
                />
              {!this.state.conversationListCollapsed
                &&
                <div className=" scrollable sidebar sidebar-right " >
                <ConversationList callBackOnClickListItem={this.enterChatRoom} callBackCollapseConversationList={() => { this.setState({ conversationListCollapsed: true }) }} />
              </div>
              }
              {!this.state.chatRoomCollapsed
                &&
                <div className="scrollable sidebar sidebar-right">
                <MessageList callBackOnClickExit={this.exitChatRoom} chatRoomInfo={this.state.chatRoomInfo}/>
              </div>
              }

              <Page>
                <Header
                  isSidebarCollapsed={sidebarCollapsed}
                  toggleConversationList={this.toggleConversationList}
                  conversationListCollapsed={conversationListCollapsed}
                  toggleSidebar={this.toggleSideCollapse}
                  routes={routes}
                  {...this.props}
                  >
                  <HeaderNav />
                </Header>
                  
                <PageContent>
                  <Outlet/>
                   {/* <Switch>
                    <Route path={'set'} component={Setting}/> */}
                    
                    {/* {routes.map((page, key) => ( */}
                      {/* <Route path={page.path} component={page.component} key={key}/> */}
                      {/* ))} */}
                    {/* <Redirect from="/" to="/home" /> */}
                  {/* </Switch> */}
              {/* </Switch> */}
                </PageContent>
              </Page>
            </div>
          </div>
        </WorkSpaceContext.Provider>
      </ContextProviders>
    );
  }
}

export function HeaderNav() {
  
  const {authUser} = useContext(UserContext)
  const navigate = useNavigate()
  const params = useParams()

  
  // const clickInvite = () =>{
  //   console.log(params.wno);

  //   navigate('/invited');
  // }

  
  const clickLogout = () =>{

    localStorage.removeItem("token");

    navigate('/login');

  }
  console.dir(authUser)

  return (
    <React.Fragment>
        <NavItem>
          <form className="form-inline">
            <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" />
            <Button type="submit" className="d-none d-sm-block">
              <i className="fa fa-search" />
            </Button>
          </form>
        </NavItem>

      <UncontrolledDropdown nav inNavbar>
          <div className='profilebox'>
              <div className='profile'>
                <span style={{
                  backgroundImage: `url(${authUser.profile})`
                  }} />
              </div>
              <div className='userid'>
                <DropdownToggle nav caret>
                  {authUser? authUser.nickname : ''} 
                </DropdownToggle>
              </div>
          </div>
          <DropdownMenu right>
          <NavLink to={`/mypage`} >
            <DropdownItem>마이페이지</DropdownItem>
          </NavLink>
          <NavLink to={`/invited`} >
            <DropdownItem>알림</DropdownItem>
          </NavLink>
          <DropdownItem divider />
          <button 
          className='logout'
          onClick={clickLogout}>로그아웃</button>
          <DropdownItem>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      {/* {this.props.children} */}

      {/* <ToggleSidebarButton
          toggleSidebar={true}
          isSidebarCollapsed={true}
      /> */}
    </React.Fragment>
  );
}
export default (props) => <DashboardLayout {...props} location={useLocation()} params={useParams()}/>