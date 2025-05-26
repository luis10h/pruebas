import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.esm.js';


export interface UserData {
  nombre: string;
  cedula: number;
  telefono: number;
  placa: number;
  sexo: string;
  nacimiento: number;
}

@Component({
  selector: 'app-tabla-taxistas',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './tabla-taxistas.component.html',
  styleUrls: ['./tabla-taxistas.component.scss'],
})
export class TablaTaxistasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'cedula', 'telefono', 'placa', 'sexo', 'nacimiento', 'acciones'];
  dataSource = new MatTableDataSource<UserData>([]);  // inicializar vacío

  private apiUrlBuscar = 'https://neocompanyapp.com/php/taxistas/get_taxistas.php';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<UserData[]>(this.apiUrlBuscar).subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.dataSource.data = data;
        } else {
          this.dataSource.data = []; // si no hay datos, asignar array vacío
          console.warn('No se encontraron registros o respuesta inválida');
        }
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
        this.dataSource.data = []; // asignar vacío para evitar errores
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarTaxista(taxista: any) {
    this.router.navigate(['dashboard/view/editar-taxista', taxista.cedula]);
  }

  eliminarTaxista(taxista: any) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.http.delete(`https://neocompanyapp.com/php/taxistas/eliminar_taxistas.php?cedula=${taxista.cedula}`).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.cedula !== taxista.cedula);
          Swal.fire({
            title: "¡Eliminado!",
            text: "El taxista ha sido eliminado.",
            icon: "success"
          });
        }, () => {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el taxista.",
            icon: "error"
          });
        });
      }
    });
  }
}


function createNewUser(): UserData {
  const nombres = ['Luis Hernández', 'Camilo Marrugo', 'Jordano Vinasco', 'Ana Torres', 'Pedro Gómez'];
  const sexos = ['Masculino', 'Femenino'];

  return {
    nombre: nombres[Math.floor(Math.random() * nombres.length)],
    cedula: Math.floor(Math.random() * 1000000000),
    telefono: 3000000000 + Math.floor(Math.random() * 100000000),
    placa: Math.floor(100000 + Math.random() * 900000),
    sexo: sexos[Math.floor(Math.random() * sexos.length)],
    nacimiento: 1970 + Math.floor(Math.random() * 30),
  };
}
