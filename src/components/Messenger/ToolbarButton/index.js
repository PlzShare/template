import React from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
  
    
    const { icon, callBackOnClick, color } = props;
    
    return (
      <i className={`toolbar-button ${icon}`} style={{color: color}} onClick={() => {callBackOnClick()}} />
    );
}