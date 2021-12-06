import React from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const { icon, callBackOnClick } = props;
    return (
      <i className={`toolbar-button ${icon}`} onClick={callBackOnClick} />
    );
}