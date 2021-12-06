import React from 'react';
import '../assets/scss/components/workspaceadd.scss';
import {Button} from 'reactstrap';

const BlankPage = () => {
  return (
    <div className="add">
        <h2 className="firstName">워크스페이스 생성하기</h2>
        <h1 className="secondName">💻 워크스페이스 이름</h1>
        <input className="nameinput" placeholder="워크스페이스 이름을 입력해주세요."></input>
        <h1 className="secondName">💻 멤버 초대</h1>
        <input className="nameinput" placeholder="초대할 멤버의 아이디를 입력해주세요."></input>
        <p className="Button"><Button color="secondary" size="lg">취소하기</Button>{'      '}<Button color="primary" size="lg">생성하기</Button></p>
    </div>
  );
};

export default BlankPage;
