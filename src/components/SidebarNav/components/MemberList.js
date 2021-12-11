import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import Modal from "react-modal";
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
// import  '../../../assets/scss/components/modals.scss';

const NavSingleItem = ({ item }) => {
  const [modals, setModals] = useState(false);


  const Icon = item.icon && Feather[item.icon] ? Feather[item.icon] : null;


  const toggle = () => {
    setModals(!modals)
}

  if (item.external) {
    const rel = item.target && item.target === '_blank' ? 'noopener noreferrer' : null;

    return (
      <li className="nav-item">
        <a href={item.url} target={item.target} rel={rel} >
          {item.icon && Icon && <Icon className="side-nav-icon" />}
          <span className="nav-item-label">{item.name}</span>
          {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
        </a>
      </li>
    );
  } else {
    // Force relative URLs to start with a slash
    const url = item.url.charAt(0) === '/' ? item.url : `/${item.url}`;

    return (
      <li className="nav-item" >
        
          <NavLink to={'#'} activeClassName="active">
            {item.icon && Icon && <Icon className="side-nav-icon" />}
            <span className="nav-item-label">{item.name}</span>
            {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
          </NavLink>

      </li>
    );
  }
};

export default NavSingleItem;
