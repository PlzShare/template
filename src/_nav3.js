import { Fragment } from 'react';
import ChannelComponent from './components/SidebarNav/components/ChannelComponent';
import DocumantComponent from './components/SidebarNav/components/DocumentComponent';
import MemberAddComponent from './components/SidebarNav/components/MemberAddComponent';

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
      name: '채널',
      icon: 'Folder',
      children: [
        {
          name: '채널1',
          url: '/channel',
        },
        {
          name: '채널2',
          url: '/channel',
        },
        {
          name: '채널3',
          url: '/channel',
        },
      ],
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
          name: '멤버초대',
          icon: 'Plus',
          url: '/memberplus',
          isButton: true,
          getComponent: (toggle, isOpen) => <MemberAddComponent callBackToggle={toggle} isOpen={isOpen}/>,
        },

      ],
    },
    {
      name: '채널추가',
      icon: 'FolderPlus',
      url: 'ddd',
      isButton : true,
      getComponent: (toggle, isOpen) => <ChannelComponent callBackToggle={toggle} isOpen={isOpen}/>,
    },
    {
      name: '문서추가',
      icon: 'FilePlus',
      url: 'ddd',
      isButton : true,
      getComponent: (toggle, isOpen) => <DocumantComponent callBackToggle={toggle} isOpen={isOpen}/>,

    },
  ],
  bottom: [

  ],
};
