export default {
  top: [
    {
      name: '초대알림',
      url: '/home',
      icon: 'Bell',
      children: [
        {
          name: '초대된 워크스페이스',
          url: '/invited',
        },
        {
          name: '초대한 워크스페이스',
          url: '/invite',
        }
      ]
    },
    {
      name: '워크스페이스알림',
      url: '/setting',
      icon: 'Bell',
      children: [
        {
          name: '워크스페이스1',
          url: 'workspacebell',
          badge: {
            text: 'NEW',
          },
        },
        {
          name: '워크스페이스2',
          url: 'workspacebell',
        }
      ]
    },
  ],
  bottom: [

  ],
};
