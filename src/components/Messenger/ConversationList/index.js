import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import ChatAddComponent from '../../SidebarNav/components/ChatAddComponent'
import './ConversationList.css';

export default function ConversationList(props) {
  const {callBackOnClickListItem, callBackCollapseConversationList} = props 
  const [conversations, setConversations] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [modals, setModals] = useState(false);

  const toggle = () => {
    setModals(!modals)
}
  useEffect(() => {
    getConversations()
  },[])

  const notifyKeywordChanged = (keyword) => {
    // console.log(keyword); // 입력받은 값이 전부 소문자로 변경됐는가 확인
    setKeyword(keyword);
  };

 const getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then(response => {
        let newConversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world!'
          };
        });
        setConversations([...conversations, ...newConversations])
    }, console.log(conversations));
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-md-arrow-round-forward" callBackOnClick={() => {callBackCollapseConversationList()}}/>
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" callBackOnClick={() => {setModals(true)}}/>
          ]}
        />
        <ChatAddComponent callBackToggle={toggle} isOpen={modals}/>

        {/* 검색 컴포넌트 - 정대겸 */}
        <ConversationSearch keyword={keyword} callback={notifyKeywordChanged}/>
        {
          conversations
            .filter(conversation => 
              conversation.name.indexOf(keyword) !== -1 ||
              conversation.text.indexOf(keyword) !== -1 )
            .map(conversation =>
            <ConversationListItem
              callBackOnClick={callBackOnClickListItem}
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}