export default {
  top: [
    {
      name : '워크스페이스1',
      url : '/workspacemain',
      icon: 'Layers'
    },
    {
      name: '환경설정',
      url: '/setting',
      icon: 'Settings',
    },
    {
      name: '멤버목록',
      icon: 'Users',
      children: [
        {
          name: '용수',
          url: '/member',
        },
        {
          name: '대겸',
          url: '/member',
        },
        {
          name: '다슬',
          url: '/member',
        },
        {
          name: '승현',
          url: '/member',
        },
        {
          name: '멤버추가',
          icon: 'Plus',
          url: '/memberplus',
        },

      ],
    },
    {
      name: '채널추가',
      icon: 'FolderPlus',
      url: 'ddd'
    },
    {
      name: '문서추가',
      icon: 'FilePlus',
      url: 'ddd',

    },
  ],
  bottom: [
    {
      name: '워크스페이스 생성',
      icon: 'Layers',
      url: '/WorkspaceAdd',
    },
    {
      name: '환경설정',
      icon: 'Settings',
      url: '/set',
    },
    {
      name: '마이페이지',
      icon: 'User',
      url: '/mypage',
    }
  ],
};
