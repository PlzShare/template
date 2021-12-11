import React from 'react';
import '../assets/scss/components/workspacemain.scss';
import { Col, div} from 'reactstrap';

const BlankPage = () => {
  const size=3
  return (
  <div className="test">
    <div className="rows">
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          {/* <div className='folder'> */}
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 size</p>
              </div>
          {/* </div> */}
        </Col>
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
              <div className='boxtop'></div>
              <div className='boxbody'>
                <p> 채널 1</p>
              </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
          <div>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
          <div>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
          <div>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
          <div>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
          <div>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </div>
          </div>
        </Col>
        <Col xl={size}>
          <div>
          <div>
          <div className='documentbody'>
            <div className='triangle'></div>
                    <p> 문서</p>
             </div>
          </div>
          </div>
        </Col>

    </div>
  </div>
  );
};

export default BlankPage;
