import React, {useRef} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const ChannelComponent = ({callBackToggle, isOpen}) => {
    const nameInput = useRef();
    const descInput = useRef();
 

    const createChannel = async () => {
        const response = await axios.post('/workspaces/2/channels',{
          name : nameInput.current.value,
          desc : descInput.current.value
        })
        console.log(response.data.result)
        console.log(response.data.message)       
        console.dir(response.data.data)
        callBackToggle();
        
        // fetch의 주소에서 '2' 이 부분은 워크스페이스 번호를 넘겨줘야함
          // const response = await fetch(`api/workspaces/2/channels`,{
          //   method: 'post',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json'
          //   },
          //   body: JSON.stringify({
          //       "name": nameInput.current.value,
          //       "desc": descInput.current.value
          //   })
          // });         
    }
    

    
    return (
            <Modal isOpen={isOpen} toggle={callBackToggle}>
                <ModalHeader toggle={callBackToggle}>채널생성</ModalHeader>
                <ModalBody>
                    <div>
                        <h5>🔹 채널이름</h5>
                        <input ref={nameInput} className="channelModalInput" name="name" placeholder="채널 이름을 입력해주세요"></input>
                        <div/>
                        <h5>🔹 채널설명</h5>
                        <input ref={descInput} className="channelModalInput" name="desc" placeholder="채널 설명을 입력해주세요"></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={createChannel}>생성하기</Button>{' '}
                  <Button color="secondary" onClick={callBackToggle}>취소하기</Button>
                </ModalFooter>
            </Modal>
    );
};

export default ChannelComponent;