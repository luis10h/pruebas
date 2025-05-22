import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

interface stats {
    id: number;
    color: string;
    title: string;
    subtitle: string;
    icon: string;
    badge: string;
}

@Component({
    selector: 'app-earning-reports',
    imports: [MaterialModule, TablerIconsModule],
    templateUrl: './earning-reports.component.html',
})
export class AppEarningReportsComponent {
    stats: stats[] = [
        {
            id: 1,
            color: 'primary',
            title: 'Luis Garcia',
            subtitle: 'pago comisiones',
            icon: 'solar:card-line-duotone',
            badge: '200.000',
        },
        {
            id: 2,
            color: 'error',
            title: 'Jose Garcia',
            subtitle: 'pago comisiones',
            icon: 'solar:wallet-2-line-duotone',
            badge: '12.55%',
        },
        {
            id: 3,
            color: 'secondary',
            title: 'Bank Transfer',
            subtitle: 'pago comisiones',
            icon: 'solar:course-up-line-duotone',
            badge: '16.3%',
        }

    ];
}
