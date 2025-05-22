import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material/table';

// table 1
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
    // MatTableDataModule
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './tables.component.html',
})
export class AppTablesComponent {
  // table 1
  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = new MatTableDataSource([] as Taxistasdata[]);
  imagenesPorId: { [key: number]: number } = {};
  getEstado(element: any): string {
    if (element.pagado === 0 && element.total === 0) return 'no registran pagos';
    if (element.pagado === 0 && element.total > 1) return 'no comenzado';
    if (element.pagado > 0 && element.total > 0 && element.pagado < element.total) return 'no comenzado';
    if (element.pagado < element.total) return 'en proceso';
    if (element.pagado === element.total) return 'completado';
    return '';
  }

  // ruta del servidor
  private apiUrl = 'https://neocompanyapp.com/php/comisiones/tabla_comisiones.php';
  // private apiUrlPruebas = 'http://localhost/php/comisiones/tabla_comisiones.php';
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.http.get<Taxistasdata[]>(this.apiUrl).subscribe(data => {
      this.dataSource1 = new MatTableDataSource<Taxistasdata>(data);

      // this.d = data;

      // Asignar imágenes según sexo
      for (let card of this.dataSource1.data) {
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
    });
    this.formBuscar = this.crearFormularioConsultar();



    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      const estado = this.getEstado(data).toLowerCase();

      // Buscar por "no pagado", incluso si el usuario escribe con espacios, mayúsculas, etc.
      if (searchTerm.includes('no pagado')) {
        return estado === 'no comenzado' || estado === 'en proceso';
      }

      if (searchTerm.includes('pagado')) {
        return estado === 'completado';
      }

      // Búsqueda general
      return (
        data.title?.toLowerCase().includes(searchTerm) ||
        data.cedula?.toString().includes(searchTerm) ||
        estado.includes(searchTerm)
      );
    };

    this.formBuscar.get('cedula')?.valueChanges.subscribe((value: string) => {
      this.dataSource1.filter = value.trim().toLowerCase();
    });
  }





  public formBuscar!: FormGroup;

  //   this.formAgregar = this.crearFormularioAgregar();
  // }
  private crearFormularioConsultar(): FormGroup {
    return this.fb.group({
      cedula: ['', [Validators.required]],
    });
  }
  // consultarPorCedula(cedula: string) {
  //   if (!cedula) return;

  //   // this.http.post<any>('http://localhost/php/comisiones/buscar_taxistas.php', { cedula })
  //   //   .subscribe({
  //   //     next: (data) => {
  //   //       if (data && data.success) {
  //   //         this.formBuscar.patchValue({
  //   //           nombre: data.taxista.nombre,
  //   //           numero_placa: data.taxista.numero_placa,
  //   //           personas_referidas: data.taxista.personas_referidas,
  //   //           estado: data.taxista.estado,
  //   //           observaciones: data.taxista.observaciones
  //   //         });
  //   //         this.formActivo = true;
  //   //       } else {
  //   //         alert('Taxista no encontrado.');
  //   //         this.formActivo = false;
  //   //       }
  //   //     },
  //   //     error: (err) => {
  //   //       console.error('Error en la búsqueda:', err);
  //   //       alert('Error al consultar.');
  //   //     }
  //   });
  // }
}
