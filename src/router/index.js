import Dashboard from '../layouts/Dashboard';
import Buttons from './elements/Buttons';
import Alerts from './elements/Alerts';
import Grid from './elements/Grid';
import Typography from './elements/Typography';
import Cards from './elements/Cards';
import Tabs from './elements/Tabs';
import Tables from './elements/Tables';
import Breadcrumbs from './elements/Breadcrumbs';
import Forms from './elements/Forms';
import Loaders from './elements/Loaders';
import BlankPage from '../layouts/BlankPage';
import Modals from './elements/Modals';
import ProgressBars from './elements/ProgressBars';
import PaginationPage from './elements/Pagination';
import ErrorPage from '../layouts/404';
import LoginPage from '../layouts/user-pages/Login';
import RegisterPage from '../layouts/user-pages/Register';
import NewDocuments from '../components/SidebarNav/components/NewDocuments.js'
import NewChannels from '../components/SidebarNav/components/NewChannels.js'
import NewChatrooms from '../components/SidebarNav/components/NewChatrooms.js'

import WorkspaceMain from '../layouts/WorkspaceMain';
import WorkspaceAdd from '../layouts/WorkspaceAdd';
import Workspacenoti from '../layouts/user-pages/Workspacenoti'
import Setting from '../layouts/Setting';
import Invited from '../layouts/user-pages/Invited';
import Invite from '../layouts/user-pages/Invite';
import Mypage from '../layouts/user-pages/Mypage';
import EditDocument from '../components/Editor/EditDocument';
import CreateDoument from '../components/Editor/CreateDocument';
import DocumentEditor from '../components/Editor/DocumentEditor';
import Channel from '../components/Channel/Channel';
// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: '워크스페이스 생성',
    path : '/workspaceadd',
    component: WorkspaceAdd
  },
  {
    name: '초대된 워크스페이스',
    path: '/invited',
    component: Invited,
  },
  // {
  //   name: '초대한 워크스페이스',
  //   path: '/invite',
  //   component: Invite,
  // },
  {
    name: '새로운 문서',
    path: '/newDocuments',
    component: NewDocuments
  },
  {
    name: '새로운 채널',
    path: '/newChannels',
    component: NewChannels
  },
  {
    name: '새로운 채팅',
    path: '/newChatrooms',
    component: NewChatrooms
  },

  {
    name: '마이페이지',
    path: '/mypage',
    component: Mypage
  },
  {
    name : 'Register',
    path : '/register',
    component: RegisterPage
  },
  {
    name : 'ㅁㅁ',
    path : '/workspace/:wno',
    children: [

      {
        name : '워크스페이스',
        path : '',
        component: WorkspaceMain,
      },
      {
        name: '환경설정',
        path: 'set',
        component: Setting
      },
      {
        name: '채널',
        path: 'channel/:cno',
        component: Channel,
      },
      {
        name: 'create-document',
        path: 'channel/:cno/create-document',
        component: CreateDoument
      },
      {
        name: 'edit-document',
        path: 'channel/:cno/edit-document/:docNo',
        component: EditDocument
      },
      {
        name: 'test-document',
        path: 'test-document',
        component: DocumentEditor
      },
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: LoginPage
  },
  {
    name: '환경설정',
    path: '/setting',
    component: BlankPage,
  },
  {
    name: '멤버',
    path: '/member',
    component: BlankPage,
  },
  {
    name: '멤버추가',
    path: '/memberplus',
    component: BlankPage,
  },
  {
    name: 'Blank',
    path: '/pages/blank',
    component: BlankPage,
  },


  {
    name: '404',
    path: '/pages/404',
    component: ErrorPage,
  },
  
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'Buttons',
    path: '/elements/buttons',
    component: Buttons,
  },
  {
    name: 'Alerts',
    path: '/elements/alerts',
    component: Alerts,
  },
  {
    name: 'Grid',
    path: '/elements/grid',
    component: Grid,
  },
  {
    name: 'Typography',
    path: '/elements/typography',
    component: Typography,
  },
  {
    name: 'Cards',
    path: '/elements/cards',
    component: Cards,
  },
  {
    name: 'Tabs',
    path: '/elements/tabs',
    component: Tabs,
  },
  {
    name: 'Tables',
    path: '/elements/tables',
    component: Tables,
  },
  {
    name: 'Progress Bars',
    path: '/elements/progressbars',
    component: ProgressBars,
  },
  {
    name: 'Pagination',
    path: '/elements/pagination',
    component: PaginationPage,
  },
  {
    name: 'Modals',
    path: '/elements/modals',
    component: Modals,
  },
  {
    name: 'Breadcrumbs',
    path: '/elements/breadcrumbs',
    component: Breadcrumbs,
  },
  {
    name: 'Forms',
    path: '/elements/forms',
    component: Forms,
  },
  {
    name: 'Loaders',
    path: '/elements/loaders',
    component: Loaders,
  },
  {
    name: 'Blank',
    path: '/pages/blank',
    component: BlankPage,
  },
 
];

export default pageList;