import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { FormAddReservaComponent } from './forms/form-add-reserva.component';
import { AppFormComisionesComponent } from './forms/form-comisiones.component';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { AppEarningReportsComponent } from 'src/app/components/earning-reports/earning-reports.component';
import { TablaTaxistasComponent } from './tables/tabla-taxistas.component';
import { TablaReservasComponent } from './tables/tabla-reservas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TablaAdministracionComponent } from './tables/tabla-administracion.component';
import { MyProfileComponent } from './profile/my-profile.component';

export const landingRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'landing-page',
        component: LandingPageComponent,
      },
    ],
  },
];


export const UiComponentsRoutes: Routes = [
  {
    path: 'view',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'administracion',
        component: TablaAdministracionComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'tabla-taxistas',
        component: TablaTaxistasComponent,
      },
      {
        path: 'tabla-reservas',
        component: TablaReservasComponent
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'form-taxista',
        component: AppFormsComponent,
      },
      {
        path: 'editar-taxista/:cedula',
        component: AppFormsComponent
      },

      {
        path: 'form-reserva',
        component: FormAddReservaComponent,
      },
      {
        path: 'form-comisiones',
        component: AppFormComisionesComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'listado-taxistas',
        component: AppBlogCardsComponent,
      },
      {
        path: 'registro-salidas',
        component: AppTotalIncomeComponent,
      },
      {
        path: 'reporte-comisiones',
        component: AppEarningReportsComponent,
      },
    ],
  },
];
// export const landingRoutes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'landing-page',
//         component: AppBadgeComponent,
//       },
//     ],
//   },
// ];