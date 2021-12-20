import React, {useState, useEffect, useContext} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import ChatAddComponent from '../../SidebarNav/components/ChatAddComponent'
import './ConversationList.css';
import UserContext from '../../utilities/ContextProviders/UserContext';
import { WorkSpaceContext } from '../../../layouts/DashboardLayout';
import { useParams } from 'react-router';
import luffy from '../../../assets/images/luffy.jpg';

export default function ConversationList(props) {
  const {callBackOnClickListItem, callBackCollapseConversationList} = props 
  const [conversations, setConversations] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [modals, setModals] = useState(false);
  const {authUser} = useContext(UserContext);
  const params = useParams()

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
    axios.get(`/workspaces/${params.wno}/chat`).then(response => {
        let newConversations = response.data.data.map(result => {
          return {
            no: `${result.no}`,
            photo: luffy,
            name: `${result.name}`,
            text: '최신메세지'
          };
        });

        setConversations([...conversations, ...newConversations])
    });
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
        {/* 검색 시 그 조건에 해당되는 부분만 뜨게 해야함 */}
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