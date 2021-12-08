import React, { useState,useRef } from 'react';
import '../assets/scss/components/workspaceadd.scss';
import { Button } from 'reactstrap';

// 게스트북의 WriteForm
const BlankPage = (e) => {
    const refForm = useRef()
    const workspaceManagement = {
        insert: async function () {
            try {
                // // simple validation
                // if(input.value === '') {
                //     throw `validation ${input.placeholder} is empty`;
                // }

                const userNo = 4
                console.log(userNo);
                const response = await fetch(`/api/workspaces/${userNo}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }, body: 'user_no=' + userNo  + '&name=' + refForm.current.name.value
                });

                refForm.current.reset();

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();

                if (json.result !== 'success') {
                    throw json.message;
                }


            } catch (err) {
                console.error(err);
            }
        },

        invite : async function(){}
    }
    return (
        <form className="add" ref={refForm}>
            <h2 className="firstName">워크스페이스 생성하기</h2>
            <h1 className="secondName">💻 워크스페이스 이름</h1>
            <input name="name" className="nameinput" placeholder="워크스페이스 이름을 입력해주세요."></input>
            <h1 className="secondName">💻 멤버 초대</h1>
            <input name="invite" className="nameinput" placeholder="초대할 멤버의 아이디를 입력해주세요."></input>
            <p className="Button"><Button color="secondary" size="lg">취소하기</Button>{'      '}<Button onClick={workspaceManagement.insert} color="primary" size="lg">생성하기</Button></p>
        </form>
    );
};

export default BlankPage;
