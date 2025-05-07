import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard',
    external: true,
  },
  {
    displayName: 'Analytics',
    iconName: 'solar:widget-add-line-duotone',
    // route: 'https://materialm-angular-main.netlify.app/dashboards/dashboard1',
    route: '/ui-components/lists',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
    showView: 'analytics',
  },


  {
    divider: true,
    navCap: 'Apps',
  },
  {
    displayName: 'Chat',
    iconName: 'solar:chat-round-line-line-duotone',
    route: '',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
 

  // {
  //   displayName: 'Blog',
  //   iconName: 'solar:widget-4-line-duotone',
  //   route: 'apps/blog',
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  //   children: [
  //     {
  //       displayName: 'Post',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'https://materialm-angular-main.netlify.app/apps/blog/post',
  //       chip: true,
  //       external: true,
  //       chipClass: 'bg-secondary text-white',
  //       chipContent: 'PRO',
  //     },
  //     {
  //       displayName: 'Detail',
  //       subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'https://materialm-angular-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
  //       chip: true,
  //       external: true,
  //       chipClass: 'bg-secondary text-white',
  //       chipContent: 'PRO',
  //     },
  //   ],
  // },

  {
    navCap: 'Ui Components',
    divider: true
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/view/badge', // modificar
    // chip: true,
    chipClass: 'bg-secondary text-white', 
    // chipContent: 'PRO',
    external: true,
  },
  {
    displayName: 'Formulario',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/view/forms',
    // chip: true,
    chipClass: 'bg-secondary text-white', 
    // chipContent: 'PRO',
    external: true,
  },

  {
    displayName: 'Agregar reserva',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/view/reserva',
    // chip: true,
    chipClass: 'bg-secondary text-white', 
    // chipContent: 'PRO',
    external: true,
  },


  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Side Login',
     subItemIcon: true,
    iconName: 'solar:round-alt-arrow-right-line-duotone',
    route: '/authentication/login',
    external: true,
    chip: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    chip: true,
    chipClass: 'bg-secondary text-white',
    external: true,
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
         external: true,
      },
    
    ],
  },
  // {
  //   displayName: 'Register',
  //   iconName: 'solar:user-plus-rounded-line-duotone',
  //   route: '/authentication',
  //   children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
        external: true,
      },
      // {
      //   displayName: 'Side Register',
      //    subItemIcon: true,
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'https://materialm-angular-main.netlify.app/authentication/side-register',
      //   external: true,
      //   chip: true,
      //   chipClass: 'bg-secondary text-white',
      //   chipContent: 'PRO',
      // },
    // ],
  // },
  {
    displayName: 'Forgot Pwd',
    iconName: 'solar:password-outline',
    route: '/authentication',
    chip: true,
    external: true,
    // children: [
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
    // children: [
    //   {
    //     displayName: 'Side Forgot Pwd',
    //      subItemIcon: true,
    //     iconName: 'solar:round-alt-arrow-right-line-duotone',
    //     route: 'https://materialm-angular-main.netlify.app/authentication/side-forgot-pwd',
    //     external: true,
    //     chip: true,
    //     chipClass: 'bg-secondary text-white',
    //     chipContent: 'PRO',
      },
      // {
      //   displayName: 'Boxed Forgot Pwd',
      //    subItemIcon: true,
      //   iconName: 'solar:round-alt-arrow-right-line-duotone',
      //   route: 'https://materialm-angular-main.netlify.app/authentication/boxed-forgot-pwd',
      //   external: true,
      //   chip: true,
      //   chipClass: 'bg-secondary text-white',
      //   chipContent: 'PRO',
      // },
  //   ],
  // },
  {
    displayName: 'Two Steps',
    iconName: 'solar:siderbar-line-duotone',
    route: '/authentication',
    chip: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
    children: [
      {
        displayName: 'Side Two Steps',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://materialm-angular-main.netlify.app/authentication/side-two-steps',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Boxed Two Steps',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://materialm-angular-main.netlify.app/authentication/boxed-two-steps',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },

];
