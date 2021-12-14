import React, { Children, Component, createContext, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Outlet, Routes, Route, useLocation, useParams } from 'react-router'
import { Button, Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, PageAlert, Page } from '../components';
import Logo from '../assets/images/vibe-logo.svg';

import nav from '../_nav3';    // 채널scrollable sidebar sidebar-right
// import nav from '../_nav2';   // 알림
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
      channelList: []
    };

    // alert('dddd')
    console.log('=====================dashboard=========================')
    console.dir(this.props)
    this.fetchWorkspaceInfo()
    this.fetchChannelList()
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
  
  enterChatRoom = () => {
    console.log('chatroom')
    this.setState({ conversationListCollapsed: true })
    this.setState({ chatRoomCollapsed: false })
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
          workspaceInfo : this.state.workspaceInfo, 
          setWorkspaceInfo : this.setWorkspaceInfo,
          channelList : this.state.channelList,
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
                <MessageList callBackOnClickExit={this.exitChatRoom} />
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

function HeaderNav() {
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
        <DropdownToggle nav caret>
          New
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Project</DropdownItem>
          <DropdownItem>User</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Message <Badge color="primary">10</Badge>
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