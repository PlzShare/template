import React from 'react';
import { Row, Col, Button } from 'reactstrap';


import '../assets/scss/components/main.scss';

const Dashboard = () => {
    

    const names = ["리액트에 함수형은 useRef, useEffect", "클래스형은 update와 mount로 다르다.", "너무 싫다.... ㅠ어엉라너리머아ㅣ", "용수야 화내지마 ㅠㅠ","자동배열 ?"];
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
             <Button color="primary" block>새로운 워크스페이스 생성</Button>{' '}
      </div>
    );
  }

export default Dashboard;
