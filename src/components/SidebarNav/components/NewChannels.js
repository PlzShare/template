import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import UserContext from '../../utilities/ContextProviders/UserContext';
import '../../../assets/scss/components/newtype.scss';


const NewChannels = () => {
  const [nickname, setNicNames] = useState([]);
  const [noti, setNoti] = useState([]);
  const { authUser } = useContext(UserContext);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (authUser) {
      fetchNotiList();
    }
  }, [authUser]);

  const deleteChannelNoti = async (e) => {
    e.stopPropagation();
    console.log(e.target.id)
    const response = await axios.delete(`noti?no=${e.target.id}`)
    }

  const fetchNotiList = async () => {
    const response = await axios.get(`/noti/type?uno=${authUser.no}&type=channel`);
    setNoti([...response.data.data])
  }
  

  const NotiList =
    noti.map((e) =>
      <Col md={12}>
        <div className="invitebox"
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}>
          <div className="profile_img">
            사진 <img src="" />
          </div>
          <h2>{e.contents}</h2>
          {isShow && (
                <button id={e.no} className="channelhover" onClick={deleteChannelNoti}>x</button>
            )}
        </div>
      </Col>
    )



  return (
    <div className='workspaceinvite'>
      <h2>새로운 채널 추가 알림</h2>

      <Row className="row">
        {NotiList}
      </Row>


    </div>

  )
}

export default NewChannels