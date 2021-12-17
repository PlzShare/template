import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import UserContext from '../../components/utilities/ContextProviders/UserContext';


const Invited = () => {
  const [nickname, setNicNames] = useState([]);
  const [noti, setNoti] = useState([]);
  const { authUser } = useContext(UserContext);

  useEffect(() => {
    if (authUser) {
      fetchNotiList();
    }
  }, [authUser]);

  const fetchNotiList = async () => {
    const response = await axios.get(`/noti?uno=${authUser.no}`);
    setNoti([...response.data.data])
  }

  const NotiList =
    noti.map((e) =>
      <Col md={12}>
        <div className="invitebox">
          <div className="profile_img">
            사진 <img src="" />
          </div>
          <h2>{e.contents}</h2>
          <a href='#' className="yes" >수락</a>
          <a href='#' className="no">거절</a>
        </div>
      </Col>
    )



  return (
    <div className='workspaceinvite'>
      <h2>초대된 워크스페이스</h2>
      <Row className="row">

      </Row>

      <Row className="row">
        {NotiList}
      </Row>


    </div>

  )
}

export default Invited