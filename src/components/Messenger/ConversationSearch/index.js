import React from 'react';
import './ConversationSearch.css';

export default function ConversationSearch({keyword, callback}) {
    return (
      <div className="conversation-search">
        <input
          type="search"
          className="conversation-search-input"
          placeholder="검색"
          onKeyDown={(e) => {console.dir(e)}}
          />
      </div> 
    );
}
