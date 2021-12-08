import React, {useState} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../assets/scss/components/setting.scss';
import {Button} from 'reactstrap';

const BlankPage = () => {

  const [selectdata, setSelectData] = useState();
  const animatedComponents = makeAnimated();

  const pushData = () =>{
      console.log(selectdata);
  }


  const selectBoxChange = (e) =>{
      // 여기서 쌓이는 값들을 useState에 쌓아서 버튼을 눌렀을 때 선택된 값을 보내도록한다.
      console.dir(e)
      setSelectData(e);
  }

  const Countries = [
      { label: "Albania", value: 355 },
      { label: "Argentina", value: 54 },
      { label: "Austria", value: 43 },
      { label: "Cocos Islands", value: 61 },
      { label: "Kuwait", value: 965 },
      { label: "Sweden", value: 46 },
      { label: "Venezuela", value: 58 }
    ];
  
  return (
    <div className="add">
        <h2 className="firstName">워크스페이스 환경설정</h2>
        <h1 className="secondName">💻 워크스페이스 이름</h1>
        <input className="nameinput" placeholder="변경할 워크스페이스 이름을 입력해주세요."></input>
        <h1 className="secondName">🔒 관리자 권한 변경</h1>
        <Select options={Countries} components={animatedComponents} onChange={selectBoxChange}/>

        <p className="Button"><Button color="secondary" size="lg">취소하기</Button>{'      '}<Button onClick={pushData} color="primary" size="lg">변경하기</Button></p>
    </div>
  );
};

export default BlankPage;
