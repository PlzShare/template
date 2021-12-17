import React, { useState, useEffect, useContext } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import MemberList from './MemberList';
import axios from 'axios';
import { WorkSpaceContext } from '../../../layouts/DashboardLayout';
import { useParams } from 'react-router';

export default function NavDropdownItem(props) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const {memberList} = useContext(WorkSpaceContext)
  const params = useParams()

  // console.log(list)
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
      {(open || props.isSidebarCollapsed) && (
        <ul className="nav-submenu">
          {memberList.map((item, index) => (
            <MemberList item={item} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
}