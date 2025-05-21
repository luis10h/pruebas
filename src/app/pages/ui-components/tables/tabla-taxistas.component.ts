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
  dataSource: MatTableDataSource<UserData>;
  // private apiUrlBuscar = 'http://localhost/php/taxistas/get_taxistas.php';
  // private apiUrlAgregar = 'https://neocompanyapp.com/php/taxistas/guardar_taxistas.php';

private api = 'http://localhost/php/taxistas/guardar_taxistas.php';
  // private apiUrlBuscar = 'http://localhost/php/taxistas/get_taxistas.php';
  private apiUrlBuscar = 'https://neocompanyapp.com/php/taxistas/get_taxistas.php';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router) {
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser());
    // this.dataSource = new MatTableDataSource(users);

  }

  ngOnInit(): void {
    this.http.get<UserData[]>(this.apiUrlBuscar).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  editarTaxista(taxista: any) {
    this.router.navigate(['dashboard/view/editar-taxista', taxista.cedula]); // o taxista.id
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
        // Filtra y actualiza la tabla eliminando el taxista
        this.dataSource.data = this.dataSource.data.filter((item) => item.cedula !== taxista.cedula);

        // Muestra confirmación
        Swal.fire({
          title: "¡Eliminado!",
          text: "El taxista ha sido eliminado.",
          icon: "success"
        });
      }, (error) => {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el taxista.",
          icon: "error"
        });
      });
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
