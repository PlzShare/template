import React, { Component } from 'react';
import reactFeature from '../assets/images/react-feature.svg';
import sassFeature from '../assets/images/sass-feature.svg';
import bootstrapFeature from '../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import WorkspaceAdd from './WorkspaceAdd';

import '../assets/scss/components/main.scss';

class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    try {
      const response = await fetch('/api', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(message)
      });

      if(!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if(json.result !== 'success') {
          throw json.message;
      }

      setMessages([json.data, ...messages]);
    } catch(err) {
        console.error(err);
    }           

    const names = ["리액트에 함수형은 useRef, useEffect", "클래스형은 update와 mount로 다르다.", "너무 싫다.... ㅠ어엉라너리머아ㅣ", "용수야 화내지마 ㅠㅠ"];
    const workspaceList = 
            names.map((name) =>
                    <Col md={12}>
                        <div className="workspacebox">
                          <h2>{name}</h2>
                          <a href='none' className="in" >IN</a>
                          <a href='none' className="out">OUT</a>
                      </div>
                    </Col>
    );

    return (
      <div className='workspacemain'>
        <h2>에쿠쿵 님의 워크스페이스 목록</h2>
        <Row className='workspacemain'>
          {workspaceList}
        </Row>
             <Button color="primary" block><i ></i>&nbsp;&nbsp;새로운 워크스페이스 생성</Button>{' '}
      </div>
    );
  }
}

export default Dashboard;
