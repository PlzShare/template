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
  console.log(noti,"sdfsdfsdfsdfsdfsdfsdfsdfs")

  useEffect(() => {
    if (authUser) {
      fetchNotiList();
    }
  }, [authUser]);

  const fetchNotiList = async () => {
    const response = await axios.get(`/noti?uno=${authUser.no}`);
    setNoti([...response.data.data])
  }


  const accept = async (e) => {

    const response = await axios.put(`/workspaces/workspace_users`, {
      userNo : authUser.no,
      workspaceNo : e.target.id,
      notiNo : e.target.name

    })
  }

  const reject = async (e) => {
    const response = await axios.delete(`/workspaces/workspace_users/noti?nno=${e.target.name}`)
  }

  const NotiList =
    noti.map((e) =>
      <Col md={12}>
        <div className="invitebox">
          <div className="profile_img">
            <span  style={{
                    backgroundImage: `url(${e.profile})`
                    }} />
          </div>
          <h2>{e.contents}</h2>
          <a href='#' onClick={accept} className="yes" id={e.workspaceNo} name={e.no}>수락</a>
          <a href='#' onClick={reject} className="no" id={e.workspaceNo} name={e.no}>거절</a>
        </div>
      </Col>
    )



  return (
    <div className='workspaceinvite'>
      <h2>초대된 워크스페이스</h2>

      <Row className="row">
        {NotiList}
      </Row>


    </div>

  )
}

export default Invited