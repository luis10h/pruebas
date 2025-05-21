import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Administracion',
    iconName: 'mdi:briefcase',
    route: '/dashboard/view/administracion',
    external: true,
  },
  {
    displayName: 'Dashboard',
    iconName: 'fa:dashboard',
    route: '/dashboard',
    external: true,
  },
  {
    displayName: 'Analytics',
    iconName: 'mdi:chart-areaspline',
    // route: 'https://materialm-angular-main.netlify.app/dashboards/dashboard1',
    route: '/dashboard/view/tables',
    chip: true,

    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
    // showView: 'analytics',
  },
  {
    displayName: 'Estadisticas',
    iconName: 'mdi:chart-areaspline',
    route: '/dashboard/view/estadisticas',
    // chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  }, 
  
  {
    displayName: 'Reportes de pagos',
    iconName: 'solar:widget-line-duotone',
    route: '/dashboard/view/reporte-comisiones',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
  // {
  //   displayName: 'Ecommerce 2',
  //   iconName: 'solar:shopping-cart-line-duotone',
  //   route: '/dashboard/view/tables',
  //   chip: true,
  //   external: true,
  //   chipClass: 'bg-secondary text-white',
  //   // chipContent: 'PRO',
  // },


  {
    divider: true,
    navCap: 'Taxistas',
  },
  {
    displayName: 'Agregar Taxistas',
    iconName: 'line-md:account-add',
    route: '/dashboard/view/form-taxista',
    // chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  }, 
  {
    displayName: 'Tabla de Taxistas',
    iconName: 'mdi:taxi',
    route: '/dashboard/view/tabla-taxistas',
    // chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
    
  {
    displayName: 'Agregar comisiones',
    iconName: 'mdi:cash',
    route: '/dashboard/view/form-comisiones',
    // chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
    {
    displayName: 'Seleccionar taxistas',
    iconName: 'solar:chat-round-line-line-duotone',
    route: '/dashboard/view/listado-taxistas',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
  {
    navCap: 'Listas',
    divider: true,
  },
  {
    displayName: 'Lista de Taxistas',
    iconName: 'mdi:format-list-bulleted',
    route: '/dashboard/view/lists',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
  {
    displayName: 'Lista de Taxistas 2',
    iconName: 'mdi:format-list-bulleted',
    route: '/dashboard/view/listado-taxistas',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
  },
  // {
  //   navCap: 'Reportes',
  //   divider: true,
  // },

  

  {
    divider: true,
    navCap: 'Reservas',
  },

  {
    displayName: 'Agregar Reserva',
    iconName: 'mdi:plus-circle',
    route: '/dashboard/view/form-reserva',
    // chip: true,
    chipClass: 'bg-secondary text-white', 
    // chipContent: 'PRO',
    external: true,
  },
  {
    displayName: 'Tabla de Reservas',
    iconName: 'mdi:table',
    route: '/dashboard/view/tabla-reservas',
    // chip: true,
    chipClass: 'bg-secondary text-white', 
    // chipContent: 'PRO',
    external: true,
  },

  {
    displayName: 'Blog',
    iconName: 'solar:widget-4-line-duotone',
    route: 'apps/blog',
    // chip: true,
    chipClass: 'bg-secondary text-white',
    // chipContent: 'PRO',
    children: [
      {
        displayName: 'Post',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://materialm-angular-main.netlify.app/apps/blog/post',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
      {
        displayName: 'Detail',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://materialm-angular-main.netlify.app/apps/blog/detail/Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
        chip: true,
        external: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },

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
  // {
  //   displayName: 'Two Steps',
  //   iconName: 'solar:siderbar-line-duotone',
  //   route: '/authentication',
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   // chipContent: 'PRO',
  //   children: [
  //     {
  //       displayName: 'Side Two Steps',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'https://materialm-angular-main.netlify.app/authentication/side-two-steps',
  //       external: true,
  //       chip: true,
  //       chipClass: 'bg-secondary text-white',
  //       chipContent: 'PRO',
  //     },
  //     {
  //       displayName: 'Boxed Two Steps',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: 'https://materialm-angular-main.netlify.app/authentication/boxed-two-steps',
  //       external: true,
  //       chip: true,
  //       chipClass: 'bg-secondary text-white',
  //       // chipContent: 'PRO',
  //     },
  //   ],
  // },

];
