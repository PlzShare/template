export default {
  top: [
    {
      divider: true,
    },
  ],
  bottom: [
    {
      name: 'Home',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'UI Elements',
      icon: 'Layers',
      children: [
        {
          name: 'Buttons',
          url: '/elements/buttons',
        },
        {
          name: 'Grid',
          url: '/elements/grid',
        },
        {
          name: 'Alerts',
          url: '/elements/alerts',
        },
        {
          name: 'Typography',
          url: '/elements/typography',
        },
        {
          name: 'Cards',
          url: '/elements/cards',
        },
        {
          name: 'Tabs',
          url: '/elements/tabs',
        },
        {
          name: 'Tables',
          url: '/elements/tables',
        },
        {
          name: 'Breadcrumbs',
          url: '/elements/breadcrumbs',
        },
        {
          name: 'Forms',
          url: '/elements/forms',
        },
        {
          name: 'Modals',
          url: '/elements/modals',
        },
        {
          name: 'Loaders',
          url: '/elements/loaders',
        },
        {
          name: 'Progress Bars',
          url: '/elements/progressbars',
        },
        {
          name: 'Pagination',
          url: '/elements/pagination',
        },
      ],
    },
    {
      name: 'Pages',
      icon: 'File',
      children: [
        {
          name: 'Blank',
          url: '/pages/blank',
        },
        {
          name: '404',
          url: '/pages/404',
        },
        {
          name: 'LoginPage',
          url: '/login'
        },
        {
          name: 'Register',
          url: '/register'
        },
        {
          name: 'Mypage',
          url: '/mypage'
        }
      ],
    },
    {
      name: 'Get Vibe',
      url: 'https://github.com/NiceDash/Vibe',
      icon: 'GitHub',
      external: true,
      target: '_blank',
    },
    {
      name: 'Account',
      url: '/dashboard',
      icon: 'User',
      badge: {
        variant: 'success',
        text: '3',
      },
    },
  ],
};
