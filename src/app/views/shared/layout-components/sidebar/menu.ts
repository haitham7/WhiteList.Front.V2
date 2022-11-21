import { MenuItem } from './menu.model';
export const MENU: MenuItem[] = [
  
  {
    title: 'المستخدمين',
    icon: 'user', 
    active: true, 
    badgeClass:'badge badge-sm bg-secondary badge-hide', 
    badgeValue:'new', 
    path: '/users/all', 
    type: 'link'
   },
  {
    title: 'شروط المستخدمين',
    icon: 'edit',
    path: '/users/usersConditions',
    type: 'link'
  },
  {
    title: 'الزبائن',
    icon: 'users',
    path: '/customers/all',
    type: 'link'
  },
  {
    title: 'الوزارات ',
    icon: 'feather',
    path: '/Ministries/all',
    type: 'link'
  },
  {
    title: 'الدوائر',
    icon: 'circle',
    path: '/Directorate/all',
    type: 'link'
  },
  {
    title: 'الاقسام',
    icon: 'layout',
    path: '/depatments/all',
    type: 'link'
  },
  {
    title: 'البطاقات',
    icon: 'file-text',
    path: '/cards/all',
    type: 'link'
  },
];
