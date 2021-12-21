import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router'
import NavSpacer from './components/NavSpacer';
import Bottom from './components/Bottom.js';
import NavOverlay from './components/NavOverlay';
import NavDivider from './components/NavDivider';
import NavSingleItem from './components/NavSingleItem';
import NavDropdownItem from './components/NavDropdownItem';
import PageAlertContext from '../PageAlert/PageAlertContext';

import navlogo from '../../assets/images/logo1.png';
import MemberChildren from './components/MemberChildren';
import WorkspaceNotiChildren from './components/WorkspaceNotiChildren';
import ChannelChildren from './components/ChannelChildren';
import UserContext from '../utilities/ContextProviders/UserContext';
import { WorkSpaceContext } from '../../layouts/DashboardLayout';


class SidebarNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const navItems = items => {
      return items.map((item, index) => itemType(item, index));
    };

    const navItems2 = items => {
      return items.map((item, index) => itemType(item, index));
    };

    const itemType = (item, index) => {
      if (item.children) {
        if(item.type == 'channel'){
          return <ChannelChildren key={index} item={item} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
        }else if(item.type == 'member'){
          return <MemberChildren key={index} item={item} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
        }else if(item.type == 'workspacenoti'){
          return <WorkspaceNotiChildren key={index} item={item} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
        }else{
          return <NavDropdownItem key={index} item={item} isSidebarCollapsed={this.props.isSidebarCollapsed} />;
        }
      } else if (item.divider) {
        return <NavDivider key={index} />;
      } else {
        return <NavSingleItem item={item} key={index} />;
      }
    };

    const NavBrand = ({ logo, logoText }) => {
      return (
        <div className="site-logo-bar">
          <NavLink to={`/worklist`} className="navbar-brand">
            {logo && <img src={navlogo} alt="logo" />}
            {logoText && <span className="logo-text">{logoText}</span>}
          </NavLink>
        </div>
      );
    };

    return (
      <PageAlertContext.Consumer>
        {consumer => {
          const hasPageAlertClass = consumer.alert ? 'has-alert' : '';
          
          return (
            <div>
              <div className={`app-sidebar ${hasPageAlertClass}`}>
                <NavBrand logo={this.props.logo} logoText={this.props.logoText} />
                <nav>
                  <ul id="main-menu">
                    {navItems(this.props.nav.top)}
                    <NavSpacer />
                    <UserContext.Consumer>
                      { ({authUser}) => {
                          return(
                            <WorkSpaceContext.Consumer>
                            {
                              ({memberList}) => {
                                return(
                                  authUser.no && memberList.length > 0 && memberList.filter((e) => {
                                    return e.userNo == authUser.no
                                  })[0].role == 'admin'?
                                    navItems2(this.props.nav.bottom):''
                                )
                              }
                            }
                            </WorkSpaceContext.Consumer>
                          )
                        } 
                      }
                      </UserContext.Consumer>
                      </ul>
                      {/* <div><button>dsfsdf</button></div> */}
                      </nav>
              </div>
              {this.props.isSidebarCollapsed && <NavOverlay onClick={this.props.toggleSidebar} />}
            </div>
          );
        }}
      </PageAlertContext.Consumer>
    );
  }
}

export default (props) => <SidebarNav {...props} params={useParams()}/>