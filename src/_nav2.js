export default {
  top: [
    {
      name: '초대알림',
      icon: 'Bell',
      children: [
        {
          name: '초대된 워크스페이스',
          url: '/invite',
        },
        // {
        //   name: '초대한 워크스페이스',
        //   url: '/invite',
        // }
      ]
    },
    {
      name: '워크스페이스알림',
      icon: 'Bell',
      children: [
        {
          name: '새로운 문서',
          url: '/newDocuments',
          // badge: {
          //   text: 'NEW',
          // },
        },
        {
          name: '새로운 채널',
          url: '/newChannels',
        },
        {
          name: '새로운 채팅',
          url: '/newChatrooms',
        },
      ]
    },
  ],
  bottom: [

  ],
};
