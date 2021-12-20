import React, { useState, useEffect } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import NavSingleItem2 from './NavSingleItem2';
import axios from 'axios';

export default function WorkspaceNotiChildren(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('88888888888888888888888')
    console.dir(props.item)
    // fetchList();
  },[])

  const toggle = e => {
    setOpen(!open)
    e.preventDefault();
    e.stopPropagation();
  };

  const { item } = props;
  const isExpanded = open ? 'open' : '';
  const Icon = item.icon ? Feather[item.icon] : null;
  const ExpandIcon = open
    ? Feather.ChevronDown
    : Feather.ChevronRight;

  const list = item.children;
  return (
    <li className={`nav-item has-submenu ${isExpanded}`}>
      <a href="#!" role="button" onClick={toggle}>
        {item.icon && Icon && <Icon className="side-nav-icon" />}
        <span className="nav-item-label">{item.name}</span>{' '}
        {item.badge && (
          <NavBadge color={item.badge.variant} text={item.badge.text} />
        )}
        <ExpandIcon className="menu-expand-icon" />
      </a>
     
        <ul className="nav-submenu">
          {list.map((item, index) => 
            <NavSingleItem2 item={item} key={index} />
          )}
        </ul>
    </li>
  );
}