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
import ChatMemberAddComponent from '../../SidebarNav/components/ChatMemberAddComponent'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col} from 'reactstrap';

import './MessageList.css';

export default function MessageList(props) {
  const {callBackOnClickExit, chatRoomInfo} = props
  const [messages, setMessages] = useState([])
  const [modals, setModals] = useState(false);
  const [userList,setUserList] = useState([]);
  const [selectdata, setSelectData] = useState([]);
  const animatedComponents = makeAnimated();
  const params = useParams()
  const {authUser} = useContext(UserContext);

  // 정대겸 : 커넥트
  const client = useRef({});

  console.log("받아온 방번호 : " + chatRoomInfo.roomNo)
  console.log("받아온 방이름 : " + chatRoomInfo.name)
  console.log(authUser)

  useEffect(() => {
    connect();
    getMessages(chatRoomInfo.roomNo);
    console.log("대화 시작")
    fetchList();
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/stomp/chat'), 
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
      
      // 정대겸 바보 이걸로 삽질함 ㅠ
      ////////////////////////////////////////
      // setMessages([...messages, broadCastingMessage])
      setMessages((prev) => {
        return [...prev, broadCastingMessage]
      }, console.log(broadCastingMessage));
      ////////////////////////////////////////
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
      }),
    });
  };

  const toggle = () =>{
    setModals(!modals)
  }

  const modalevent = (e) => {
      e.preventDefault();
      setModals(true)
  }

    // console.dir(userList)
    const fetchList = async () => {
      const response = await axios.get(`/workspaces/workspace-users?wno=${params.wno}&?uno=${params.uno}`)
      response.data.data.forEach(e => {e['label'] = e.id; e['value'] = e.id})
      setUserList(response.data.data.filter( el => el.userNo != 3))
      console.log(chatRoomInfo)
  }

  const pushData = () =>{
    console.log(selectdata);
    // callBackToggle();
  }

  const selectBoxChange = (e) =>{
    // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
    setSelectData(e);
}

   // 정대겸
  const callbackMessage = {
    add: function(mySendMessage) {
        mySendMessage.userNo = authUser.no; // 유저 고유번호
        mySendMessage.userName = authUser.name // 유저 이름
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
  
  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.userNo === authUser.no;
      let userName = current.userName;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

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

      tempMessages.push(
        <Message
          key={i}
          name={userName}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
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
            <ToolbarButton key="person" icon="ion-ios-person-add" callBackOnClick={modalevent}>
            </ToolbarButton>,
          <ToolbarButton key="video" icon="ion-ios-videocam"/>
        ]}
          
        />
        
        {/* <Modal isOpen={modals}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                수락하시겠습니까 ?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>수락하기</Button>{' '}
                <Button color="secondary" onClick={toggle}>취소하기</Button>
            </ModalFooter>
        </Modal> */}
       
        <ChatMemberAddComponent isOpen={modals} callBackToggle={toggle}/>

{/* 
        <Modal isOpen={modals} toggle={toggle}>
                <ModalHeader toggle={toggle}>멤버 초대</ModalHeader>
                <ModalBody>
                    <div>
                        <h5>🔹 초대할 멤버 아이디</h5>
                        <Select 
                        options={userList} 
                        components={animatedComponents} 
                        isMulti 
                        onChange={selectBoxChange}
                        />
    
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={pushData}>초대하기</Button>
                  <Button color="secondary" onClick={toggle}>취소하기</Button>
                </ModalFooter>
         </Modal> */}

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