import React, { Component } from 'react';
import ToggleSidebarButton from './components/ToggleSidebarButton';
import ToggleSidebarButtonRight from './components/ToggleSidebarButtonRight';
import PageLoader from '../PageLoader/PageLoader';

import { Navbar, Collapse, Nav } from 'reactstrap';
import { matchPath } from 'react-router-dom';
import { useLocation, useParams } from 'react-router'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    console.dir(props)
    // console.dir(this.props.match)
    // console.dir(props.match)
    console.log('=====================header=========================')
    // console.dir(this.props)
    console.log(this.props.location.pathname)
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  click=() =>{

  }

  isMatched = (path) => {
    // console.log(this.props.location.pathname)

    const result = matchPath(this.props.location.pathname, path) 
    return result
  }

  getPageTitle = () => {
    let name;

    this.props.routes.forEach(prop => {
      if(prop.children){
        prop.children.forEach( child => {
          this.isMatched(prop.path + '/' + child.path) && (name = child.name)
        })
      }else{
        if (this.isMatched(prop.path)) {
          name = prop.name;
        }
      }
    });
    console.log(name)
    return name;
  };

  render() {
    return (
      <header className="app-header">
        <SkipToContentLink focusId="primary-content" />
        <div className="top-nav">
          <Navbar color="faded" light expand="md">
            <ToggleSidebarButton
              toggleSidebar={this.props.toggleSidebar}
              isSidebarCollapsed={this.props.isSidebarCollapsed}
            />
            <div className="page-heading">{this.getPageTitle()}</div>
            
            {/* <NavbarToggler onClick={this.toggle} /> */}
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.props.children}
              </Nav>
            </Collapse>
            
            <ToggleSidebarButtonRight
              toggleSidebar={this.props.toggleConversationList}
              isSidebarCollapsed={this.props.conversationListCollapsed}
              icon='comments'
              onClick={this.click()}
            />
            <PageLoader />
          </Navbar>
        </div>
      </header>
    );
  }
}

const SkipToContentLink = ({ focusId }) => {
  return (
    <a href={`#${focusId}`} tabIndex="1" className="skip-to-content">
      Skip to Content
    </a>
  );
};

export default (props) => <Header {...props} params={useParams()} location={useLocation()}/>