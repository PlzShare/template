
// import ChannelComponent from './components/SidebarNav/components/ChannelComponent';
// import DocumantComponent from './components/SidebarNav/components/DocumentComponent';
import ChannelComponent from './components/SidebarNav/components/ChannelComponent';
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
      type : 'member',
      name: '멤버목록',
      icon: 'Users',
      children: [
        
      ],
    },
    {
      name: '채널추가',
      icon: 'FolderPlus',
      url: '',
      isButton : true,
      getComponent: (toggle, isOpen) => <ChannelComponent callBackToggle={toggle} isOpen={isOpen}/>,
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
    {
      name: '멤버초대',
      icon: 'UserPlus',
      url: '/memberplus',
      isButton: true,
      getComponent: (toggle, isOpen) => <MemberAddComponent callBackToggle={toggle} isOpen={isOpen}/>,
    }
  ],
  bottom: [

  ],
};
