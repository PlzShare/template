import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import Modal from "react-modal";
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import nav3 from '../../../_nav3';
import {useParams} from 'react-router'
import { WorkSpaceContext } from '../../../layouts/DashboardLayout';
// import  '../../../assets/scss/components/modals.scss';

const NavSingleItem = ({ item }) => {
  const [modals, setModals] = useState(false);
  const params = useParams()
  const {workspaceInfo} = useContext(WorkSpaceContext)
  const Icon = item.icon && Feather[item.icon] ? Feather[item.icon] : null;


  const toggle = () => {
      setModals(!modals)
  }

  if (item.external) {
    const rel = item.target && item.target === '_blank' ? 'noopener noreferrer' : null;

    return (
      <li className="nav-item">
        <a href={`${item.url}`} target={item.target} rel={rel} >
          {item.icon && Icon && <Icon className="side-nav-icon" />}
          <span className="nav-item-label">{item.name}</span>
          {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
        </a>
      </li>
    );
  } else {
    // Force relative URLs to start with a slash
    const url = item.url.charAt(0) === '/' ? `/workspace/${params.wno}${item.url}` : `/workspace/${params.wno}/${item.url}`;

    return (
      <li className="nav-item" >
        {item.isButton ?
          <a href='' onClick={(e) => {
            e.preventDefault();
            setModals(true)}}>
            {item.getComponent(toggle, modals)}
            {item.icon && Icon && <Icon className="side-nav-icon" />}
            <span className="nav-item-label">{item.name}</span>
            {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
          </a> 
          :
          <NavLink to={url} activeClassName="active">
            {item.icon && Icon && <Icon className="side-nav-icon" />}
            <span className="nav-item-label">{item.type == 'workspaceName' ? workspaceInfo.name : item.name}</span>
            {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
          </NavLink>
        }
      </li>
    );
  }
};

export default NavSingleItem;
