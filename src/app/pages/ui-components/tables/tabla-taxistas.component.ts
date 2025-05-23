import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfileTaxistasComponent } from '../profile/profile-taxistas.component';

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
    MatDialogModule,
  ],
  templateUrl: './tabla-taxistas.component.html',
  styleUrls: ['./tabla-taxistas.component.scss'],
})
export class TablaTaxistasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'cedula', 'telefono', 'placa', 'sexo', 'nacimiento', 'acciones'];
  dataSource: MatTableDataSource<UserData>;

  private api = 'http://localhost/php/taxistas/guardar_taxistas.php';
  private apiUrlBuscar = 'https://neocompanyapp.com/php/taxistas/get_taxistas.php';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http.get<UserData[]>(this.apiUrlBuscar).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
          this.dataSource.data = this.dataSource.data.filter((item) => item.cedula !== taxista.cedula);
          Swal.fire("¡Eliminado!", "El taxista ha sido eliminado.", "success");
        }, (error) => {
          Swal.fire("Error", "No se pudo eliminar el taxista.", "error");
        });
      }
    });
  }

  abrirDetalleTaxista(taxista: any) {
    this.dialog.open(ProfileTaxistasComponent, {
      data: taxista,
      width: '400px',
      height: '550px',
      position: {
        top: '100px' },
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
