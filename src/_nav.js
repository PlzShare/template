export default {
  top: [
    {
      name: '워크스페이스1',
      url: '/WorkspaceMain',
      icon: 'Layers',
    },
    {
      name: '환경설정',
      icon: 'Settings',
      url: '/set',
    },
    {
      name: '멤버목록',
      icon: 'Users',
      children: [
        {
          name: '용수',
          url: '.',
        },
        {
          name: '대겸',
          url: '.',
        },
        {
          name: '다슬',
          url: '.',
        },
        {
          name: '승현',
          url: '.',
        },
        {
          name: '멤버초대',
          icon: 'Plus',
          url: '/memberplus',
          isButton: true,
          ModalHeader: '멤버 초대',
          ModalBody1: <div>
                          <h5>🔹 초대할 멤버 아이디</h5>
                          <input className="memberModalInput" placeholder="ID"></input>
                      </div>,
          ok: '초대하기',
          cancel: '취소하기'
        },

      ],
    },
    {
      name: '채널추가',
      icon: 'FolderPlus',
      url: '',
      isButton : true,
      ModalHeader: '채널 생성',
      ModalBody1: <div>
                      <h5>🔹 채널이름</h5>
                      <input className="channelModalInput" placeholder="채널 이름을 입력해주세요"></input>
                      <div/>
                      <h5>🔹 채널설명</h5>
                      <input className="channelModalInput" placeholder="채널 설명을 입력해주세요"></input>
                  </div>,
      ok: '생성하기',
      cancel: '취소하기'
    },
    {
      name: '문서추가',
      icon: 'FilePlus',
      url: '',
      isButton : true,
      ModalHeader: '문서 에디터',
      ModalBody: '문서 에디터 넣어야함',
      ok: '생성하기',
      cancel: '취소하기'

    },
  ],
  bottom: [
    
  ],
};
