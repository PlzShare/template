import React, { useState, useEffect } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import MemberList from './MemberList';
import axios from 'axios';

export default function NavDropdownItem(props) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList();
  },[])
  console.log(list)
  const toggle = e => {
    setOpen(!open)
    e.preventDefault();
    e.stopPropagation();
  };

  const fetchList = async () => {
    const response = await axios.get('/workspaces/workspace-users/138/23')
    response.data.data.forEach((user) => {user.url = `/member/${user.userNo}`; user.name=user.nickname;});
    setList(response.data.data)
    console.log(list , "하하하하하하하하하하");
    // console.response.data.data
}

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
          {list.map((item, index) => (
            <MemberList item={item} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
}