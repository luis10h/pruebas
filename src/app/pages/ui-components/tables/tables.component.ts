import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Taxistasdata {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
  sexo: string | 'femenino' | 'masculino';
}

@Component({
  selector: 'app-tables',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = new MatTableDataSource<Taxistasdata>([]);
  imagenesPorId: { [key: number]: number } = {};

  public formBuscar!: FormGroup;

  private apiUrl = 'https://neocompanyapp.com/php/comisiones/tabla_comisiones.php';
  // private apiUrlPruebas = 'http://localhost/php/comisiones/tabla_comisiones.php';
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  ngOnInit(): void {
    // Realizar la petición HTTP para obtener los datos 
    this.http.get<Taxistasdata[]>(this.apiUrl).subscribe(
      data => {
        // Asegurar que data sea un array, incluso si está vacío
        const safeData = Array.isArray(data) ? data : [];

        // Asignar la fuente de datos, aunque esté vacía
        this.dataSource1 = new MatTableDataSource<Taxistasdata>(safeData);

        // Solo asignar imágenes si hay datos
        if (safeData.length > 0) {
          for (let card of safeData) {
            let numeroAleatorio = 0;
            if (card.sexo === 'femenino') {
              const opciones = [2, 4, 10];
              numeroAleatorio = opciones[Math.floor(Math.random() * opciones.length)];
            } else {
              const opciones = [1, 3, 5, 6, 7, 8, 9];
              numeroAleatorio = opciones[Math.floor(Math.random() * opciones.length)];
            }
            this.imagenesPorId[card.id] = numeroAleatorio;
          }
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
        this.dataSource1 = new MatTableDataSource<Taxistasdata>([]); // Evitar errores si falla la petición
      }
    );

    this.formBuscar = this.crearFormularioConsultar();

    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      const searchTerm = filter?.trim().toLowerCase() || '';
      const estado = this.getEstado(data)?.toLowerCase() || '';

      if (searchTerm.includes('no pagado')) {
        return estado === 'no comenzado' || estado === 'en proceso';
      }

      if (searchTerm.includes('pagado')) {
        return estado === 'completado';
      }

      return (
        data?.title?.toLowerCase()?.includes(searchTerm) ||
        data?.cedula?.toString()?.includes(searchTerm) ||
        estado.includes(searchTerm)
      );
    };

      this.formBuscar.get('cedula')?.valueChanges.subscribe((value: string) => {
        this.dataSource1.filter = value.trim().toLowerCase();
      });
    }

  getEstado(element: any): string {
    if (element.pagado === 0 && element.total === 0) return 'no registran pagos';
    if (element.pagado === 0 && element.total > 1) return 'no comenzado';
    if (element.pagado > 0 && element.total > 0 && element.pagado < element.total) return 'no comenzado';
    if (element.pagado < element.total) return 'en proceso';
    if (element.pagado === element.total) return 'completado';
    return '';
  }

  private crearFormularioConsultar(): FormGroup {
    return this.fb.group({
      cedula: ['', [Validators.required]],
    });
  }

  // Métodos agregados para botones

  pagarCompleto(element: any): void {
    console.log(`Pagar completo para el ID: ${element.id}`);
    alert(`Pagar completo para ${element.title || element.uname}`);
  }

  abonar(element: any): void {
    console.log(`Abonar pago para el ID: ${element.id}`);
    alert(`Abonar pago para ${element.title || element.uname}`);
  }
}
