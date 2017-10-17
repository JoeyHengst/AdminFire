import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Gesprekken',
    icon: 'nb-keypad',
    link: '/pages/notes',
    children: [
      {
        title: 'Persoonlijk',
        link: '/pages/notes',
      },
      {
        title: 'Specifiek',
        link: '/pages/ui-features/grid',
      }
    ],
  },
  {
    title: 'Verslagen',
    icon: 'nb-compose',
    children: [
      {
        title: 'Linie overleg',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Staf overleg',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Evaluaties',
    icon: 'nb-gear',
    children: [
      {
        title: 'Trainingen',
        link: '/pages/components/tree',
      }, {
        title: 'Wedstrijden',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Trainingen',
    icon: 'nb-location'    
  },
  {
    title: 'Planning',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Voorbereiding',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Trainingen',
        link: '/pages/charts/chartjs',
      }
    ],
  }
];
