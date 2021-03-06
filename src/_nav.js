
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
