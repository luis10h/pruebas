import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    imports: [CommonModule, MaterialModule, TablerIconsModule],
    templateUrl: './earning-reports.component.html',
})
export class AppEarningReportsComponent {
    stats: stats[] = [];
    private apiUrl = 'https://neocompanyapp.com/php/comisiones/tabla_comisiones.php';
    constructor(private http: HttpClient) {
        this.cargarReportes();

    }
    ngOnInit(): void {
        // Aquí puedes llamar a cargarReportes si quieres cargar los datos al iniciar el componente
        this.cargarReportes();
    }



    cargarReportes() {
        this.http.get<stats[]>(this.apiUrl).subscribe((response) => {
            if (Array.isArray(response)) {
                this.stats = response.map((item) => ({
                    ...item,
                    // icon: this.getIcon(item.icon),
                }));
                console.log('Datos cargados:', this.stats);
            } else {
                this.stats = [];
                console.error('Error al cargar los datos:', response);
            }
        });

    }
}
