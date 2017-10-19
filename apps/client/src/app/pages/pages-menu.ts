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
        link: '/pages/notes/personal',
      },
      {
        title: 'Specifiek',
        link: '/pages/notes/specific',
      }
    ],
  },
  {
    title: 'Verslagen',
    icon: 'nb-compose',
    children: [
      {
        title: 'Linie overleg',
        link: '/pages/records/line',
      },
      {
        title: 'Staf overleg',
        link: '/pages/records/staff',
      },
    ],
  },
  {
    title: 'Evaluaties',
    icon: 'nb-gear',
    children: [
      {
        title: 'Trainingen',
        link: '/pages/evaluations/trainings',
      }, {
        title: 'Wedstrijden',
        link: '/pages/evaluations/matches',
      },
    ],
  },
  {
    title: 'Trainingen',
    icon: 'nb-location',
    link: '/pages/trainings',    
  },
  {
    title: 'Planning',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Voorbereiding',
        link: '/pages/planning/preparation',
      },
      {
        title: 'Trainingen',
        link: '/pages/planning/trainings',
      }
    ],
  }
];
