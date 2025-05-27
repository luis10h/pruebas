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
    standalone: true
})
export class AppEarningReportsComponent {
    stats: stats[] = [];
    private apiUrl = 'https://neocompanyapp.com/php/comisiones/tabla_comisiones.php';

    // Variables para paginación
    pageSize = 5;              // items por página
    currentPage = 1;           // página actual

    constructor(private http: HttpClient) {
        this.cargarReportes();
    }

    ngOnInit(): void {
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

    // Total de páginas según datos y pageSize
    get totalPages(): number {
        return Math.ceil(this.stats.length / this.pageSize);
    }

    // Obtener solo los elementos visibles en la página actual
    get pagedStats(): stats[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.stats.slice(startIndex, startIndex + this.pageSize);
    }

    // Cambiar página asegurando no salir de límites
    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
    }

    // TrackBy para optimizar ngFor
    trackByTitle(index: number, item: stats): string {
        return item.title;
    }
}
