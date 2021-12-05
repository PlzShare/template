import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, PageAlert, Page } from '../vibe';
import Logo from '../assets/images/vibe-logo.svg';
import nav from '../_nav_ref';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import ConversationList from '../vibe/components/Messenger/ConversationList'
import MessageList from '../vibe/components/Messenger/MessageList';
// import ToggleSidebarButton from '../vibe/components/ToggleSidebarButton';
const MOBILE_SIZE = 992;

export default class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      conversationListCollapsed: true,
      chatRoomCollapsed : true,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
    };
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
    this.setState(prevState => ({conversationListCollapsed : !prevState.conversationListCollapsed}))
  }
  enterChatRoom = () => {
    console.log('chatroom')
    this.setState({conversationListCollapsed: true})
    this.setState({chatRoomCollapsed : false})
  }
  exitChatRoom = () => {
    console.log('exit')
    this.setState({conversationListCollapsed: false})
    this.setState({chatRoomCollapsed : true})  
  }

  render() {
    const { sidebarCollapsed, conversationListCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              nav={nav}
              logo={Logo}
              logoText="VIBE."
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            
            <Page>
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                toggleConversationList={this.toggleConversationList}
                conversationListCollapsed={conversationListCollapsed}
                routes={routes}
                {...this.props}
              >
                <HeaderNav />
              </Header>
              <PageContent>
                <Switch>
                  {routes.map((page, key) => (
                    <Route path={page.path} component={page.component} key={key} />
                  ))}
                  <Redirect from="/" to="/home" />
                </Switch>
              </PageContent>
            </Page>
            {!this.state.conversationListCollapsed 
            && 
            <div className="scrollable sidebar sidebar-right">
              <ConversationList callBackOnClickListItem={this.enterChatRoom}  callBackCollapseConversationList={()=> this.setState({conversationListCollapsed: true})}/>
            </div>}
            {
              !this.state.chatRoomCollapsed
              &&
              <div className="scrollable sidebar sidebar-right">
                <MessageList callBackOnClickExit={this.exitChatRoom}/>
                </div>
            }
            
          </div>
          <Footer>
            <span>Copyright © 2019 Nice Dash. All rights reserved.</span>
            <span>
              <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
            </span>
            <span className="ml-auto hidden-xs">
              Made with{' '}
              <span role="img" aria-label="taco">
                🌮
              </span>
            </span>
          </Footer>
         
        </div>
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
