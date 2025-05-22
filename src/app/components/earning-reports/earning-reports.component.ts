import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HttpClient } from '@angular/common/http';

interface stats {
    id: number;
    color: string;
    title: string;
    estado: string;
    icon: string;
    pagado: string;
}

@Component({
    selector: 'app-earning-reports',
    imports: [MaterialModule, TablerIconsModule],
    templateUrl: './earning-reports.component.html',
})
export class AppEarningReportsComponent {
    stats: stats[] = [];
    private apiUrl = 'https://neocompanyapp.com/php/comisiones/tabla_comisiones.php';
    constructor(private http: HttpClient) {
        this.cargarReportes();

    }
    cargarReportes() {
        this.http.get<stats[]>(this.apiUrl).subscribe((data) => {
            this.stats = data.map((item) => ({
                ...item,
                // icon: this.getIcon(item.icon),
            }));
        });
    }
}
