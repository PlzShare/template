import React from 'react';
import '../assets/scss/components/workspacemain.scss';
import { Col, Card} from 'reactstrap';

const BlankPage = () => {
  return (
  <div className="test">
    <div className="rows">
        <Col xs={0}>
          <Card>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </Card>
        </Col>
        <Col xs={3}>
          <Card>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </Card>
        </Col>
        <Col xs={9}>
          <Card>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </Card>
        </Col>
    </div>
    <div className="rows">
        <Col xs={2}>
          <Card>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </Card>
        </Col>
        <Col xs={2}>
          <Card>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </Card>
        </Col>
        <Col xs={2}>
          <Card>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </Card>
        </Col>
        <Col xs={2}>
          <Card>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </Card>
        </Col>
    </div>
  </div>
  );
};

export default BlankPage;
