import React, { useState, useEffect } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import NavSingleItem from './NavSingleItem';
import axios from 'axios';

export default function ChannelChildren(props) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);


  useEffect(() => {
    fetchList();
  },[])

  
  const toggle = e => { //승현아 살려줘~~~~~~~~나좀 살려줘어어어어엉~!@@@@@@
    setOpen(!open)
    e.preventDefault();
    e.stopPropagation();
  };

  const fetchList = async () => {
    const response = await axios.get('/workspaces/138/channels')
    response.data.data.forEach((channel) => channel.url = `/channel/${channel.no}`);
    console.dir(response.data.data)
    setList(response.data.data)
    console.log(list , "ddddddddddddddddddddddddd");
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
            <NavSingleItem item={item} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
}
