import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const {
      data,
      name,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      addMemberstamp
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    const addName = name;
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }
        {
          addMemberstamp &&
              <div className="timestamp">
              { addName } 참가하였습니다.
            </div>
        }
        { !addMemberstamp &&  
        <div className="bubble-container">
          <div className='name'>
            { name }
          </div>
          
          <div className="bubble" title={friendlyTimestamp}>
            { data.message }
          </div>
          
        </div>
        }
      </div>
    );
}