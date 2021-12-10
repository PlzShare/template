import React from 'react';
import { Button } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';

export default function SidebarToggleButton({ isSidebarCollapsed, toggleSidebar, icon }) {
  const chevronClassName = isSidebarCollapsed ? 'is-collapsed' : 'is-not-collapsed';
  const screenReaderLabel = isSidebarCollapsed ? 'Expand Sidebar Navigation' : 'Collapse Sidebar Navigation';
  console.log(icon)
  return (
    <Button onClick={toggleSidebar} className={`m-r sidebar-toggle ${chevronClassName}`} aria-label={screenReaderLabel}>
      {/* <FontAwesomeIcon icon={faBell}/> */}
      <FontAwesomeIcon name={icon? icon:'chevron-right'} />
    </Button>
  );
}
