import React, {useEffect, useRef, useState, useContext} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import makeAnimated from 'react-select/animated';
import Message from '../Message';
import moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from 'react-router';
import UserContext from '../../utilities/ContextProviders/UserContext';
import ChatMemberAddComponent from '../../SidebarNav/components/ChatMemberAddComponent';
import ChatExit from '../../SidebarNav/components/ChatExit';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col} from 'reactstrap';
import './MessageList.css';
import { useNavigate } from 'react-router';
import {IPContext} from '../../../App'

export default function MessageList(props) {
  
  const {callBackOnClickExit, chatRoomInfo} = props
  const [messages, setMessages] = useState([])
  const [modals, setModals] = useState(false);
  const [exitmodals, setExitModals] = useState(false);
  const [userList,setUserList] = useState([]);
  const [selectdata, setSelectData] = useState([]);
  const [chatUserList, setChatUserList] = useState([]);
  const animatedComponents = makeAnimated();
  const params = useParams()
  const {authUser, setRoomNumber} = useContext(UserContext);

  const {chatServer} = useContext(IPContext)
  const navigate = useNavigate()

  const client = useRef({});

  console.log(chatRoomInfo)
  console.log("받아온 방번호 : " + chatRoomInfo.roomNo)
  console.log("받아온 방이름 : " + chatRoomInfo.name)
  
  setRoomNumber(chatRoomInfo.roomNo);

  useEffect(() => {
    connect();
    getMessages(chatRoomInfo.roomNo);
    fetchList();
    getMemberList();
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`${chatServer}/stomp/chat`), 
      // connectHeaders: {
      //   "auth-token": "spring-chat-auth-token", 
      // },
      // 헤더에 실어 보낼거면 여기에 추가
      debug: function (str) {
        console.log(str);
      },

      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        subscribe();
      },

      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  // 브로드캐스팅 받는 부분
  const subscribe = () => {
    client.current.subscribe(`/sub/greetings/${chatRoomInfo.roomNo}`, ({ body }) => {
      const broadCastingMessage = {}
      broadCastingMessage.userNo = JSON.parse(body).userNo;
      broadCastingMessage.userName = JSON.parse(body).userName;
      broadCastingMessage.message = JSON.parse(body).contents;
      broadCastingMessage.timestamp = new Date().getTime();
      
      setMessages((prev) => {
        return [...prev, broadCastingMessage]
      }, console.log(broadCastingMessage));
    });
  };

  const publish = (mySendMessage) => {
    if (!client.current.connected) {
      return;
    }

    // pub 부분
    client.current.publish({
      destination: "/pub/server",
      body: JSON.stringify({
        userNo: mySendMessage.userNo,
        userName: mySendMessage.userName,
        contents: mySendMessage.message,
        chatroomNo: mySendMessage.chatroomNo,
        chatroomUsers : chatUserList
      }),
    });
  };

  const toggle = (addList) =>{
    setModals(!modals)
    console.log(addList)
    if(addList && Array.isArray(addList)){
      console.log(addList)
      console.log(addList.map((user) => {
        const addSendMessage = {}
        addSendMessage.userNo = user.userNo;
        addSendMessage.userName = user.nickname;
        addSendMessage.chatroomNo = chatRoomInfo.roomNo;
        addSendMessage.message = '접속'

        publish(addSendMessage)
    }))
    }
  }

  const exittoggle = () =>{
    setExitModals(!exitmodals)
    // 여기서 렌더링 다시
  }

  const modalevent = (e) => {
      e.preventDefault();
      setModals(true)
  }

  const exitmodal = (e) => {
    e.preventDefault();
    setExitModals(true)
}

    // console.dir(userList)
    const fetchList = async () => {
      const response = await axios.get(`/workspaces/workspace-users?wno=${params.wno}&?uno=${params.uno}`)
      response.data.data.forEach(e => {e['label'] = e.id; e['value'] = e.id})
      setUserList(response.data.data.filter( el => el.userNo != authUser.no))
  }

  const pushData = () =>{
    console.log(selectdata);
    // callBackToggle();
  }

  const selectBoxChange = (e) =>{
    // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
    setSelectData(e);
}

  const callbackMessage = {
    add: function(mySendMessage) {
        mySendMessage.userNo = authUser.no; // 유저 고유번호
        mySendMessage.userName = authUser.nickname // 유저 이름
        mySendMessage.chatroomNo = chatRoomInfo.roomNo // 방 고유번호
        publish(mySendMessage) // 보냄
        console.log(mySendMessage);
    }
  }

  const getMessages = async (no) => {
    const response = await axios.get(`/workspaces/${params.wno}/chat/${no}`);
    var tempMessages = response.data.data.map( e => {
      return {
        userNo:e.userNo,
        userName:e.userName,
        message:e.contents,
        timestamp:e.createdAt,
      }
    })

     setMessages([...messages, ...tempMessages])
 }

  const getMemberList = async () => {
    const response = await axios.get(`/workspaces/${params.wno}/chat/noti/${chatRoomInfo.roomNo}`);
    
    setChatUserList([...response.data.data])
    console.log("========================ㅎㅇ=====================")
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let memberAddState = current.message;
      let isMine = current.userNo === authUser.no;
      let userName = current.userName;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;
      let addMemberstamp = false;

      // 시간 추가
      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.userNo === current.userNo;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      if(memberAddState === '접속'){
        addMemberstamp = true;
      }

      // isMine 이 false면 null 값을 Message 컴포넌트에 넘겨줌으로써,
      // Message 컴포넌트에서 이름이 뜨지 않게함
      tempMessages.push(
        <Message
          key={i}
          name={isMine ? '' : userName}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          addMemberstamp={addMemberstamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <div className="message-list">
        <Toolbar
          leftItems={[
            <span>
              <ToolbarButton key="info" icon="ion-md-exit" callBackOnClick={ callBackOnClickExit }/>
            </span>
          ]}

          title={chatRoomInfo.name}
          rightItems={[

            <ToolbarButton key="person" icon="ion-ios-person-add" callBackOnClick={modalevent}/>,
            <ToolbarButton key="trash" icon="ion-ios-trash" callBackOnClick={exitmodal}/>
        ]}

        />

        <ChatMemberAddComponent 
            ctno={chatRoomInfo.roomNo}
            callBackToggle={toggle}
            isOpen={modals} />

        <ChatExit 
            ctno={chatRoomInfo.roomNo} 
            isOpen={exitmodals} 
            callBackExitToggle={callBackOnClickExit}
            callBackToggle={exittoggle}/>

        <div className="message-list-container">{renderMessages()}</div>

        <Compose rightItems=
        {[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]} callbackMessage={callbackMessage}/>
      </div>
    );
}
