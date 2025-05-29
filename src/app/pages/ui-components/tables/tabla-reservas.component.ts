import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { U } from '@angular/cdk/unique-selection-dispatcher.d-DSFqf1MM';

export interface UserData {
  nombre: string;
  cedula: number;
  telefono: number;
  cantidadpersonas: number;
  lugar: string;
  fecha: string;
  hora: string;
}

const NOMBRES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver'
];
const LUGARES: string[] = ['Sala', 'Terraza'];

@Component({
  selector: 'app-tabla-reservas',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tabla-reservas.component.html',
  styleUrls: ['./tabla-reservas.component.scss']
})
export class TablaReservasComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'nombre',
    'cedula',
    'telefono',
    'cantidadpersonas',
    'lugar',
    'fecha',
    'hora',
    'acciones'
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<UserData>([]);
    this.cargarReservas();
  }
sessionObj: any;
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
    const session = localStorage.getItem('session');
    if (session) {
      this.sessionObj = JSON.parse(session);
      console.log('Usuario en sesión desde comisiones:', this.sessionObj.user.username);
      console.log('ID de usuario desde comisiones:', this.sessionObj.user.company_code);
    } else {
      console.log('No hay usuario en sesión');
    }
    const companyNameDeseado = this.sessionObj.user.company_code;

}


  cargarReservas() {
    const apiUrl = 'https://neocompanyapp.com/php/reservas/get_reservas.php';
    this.http.get<UserData[]>(apiUrl).subscribe({
      next: (response) => {
        console.log('Datos cargados:', response);
        if (Array.isArray(response)) {
          
          this.dataSource.data = response.map((item, index) => ({
            ...item,
            // Puedes agregar más campos si es necesario
          }));
        } else {
          this.dataSource.data = [];
          console.error('Error al cargar los datos:', response);
        }
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        this.dataSource.data = [];
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

  editarReserva(reserva: UserData) {
    console.log('Editar reserva:', reserva);
  }

  eliminarReserva(reserva: UserData) {
    console.log('Eliminar reserva:', reserva);
  }

  exportarExcel() {
    const data = this.dataSource.filteredData.map(row => ({
      Nombre: row.nombre,
      Cédula: row.cedula,
      Teléfono: row.telefono,
      Personas: row.cantidadpersonas,
      Lugar: row.lugar,
      Fecha: row.fecha,
      Hora: row.hora
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reservas');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Reservas.xlsx');
  }
}

function createNewUser(id: number): UserData {
  const nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const cedula = Math.floor(Math.random() * 1_000_000_000);
  const telefono = 3000000000 + Math.floor(Math.random() * 999999999);
  const cantidadpersonas = Math.floor(Math.random() * 5) + 1;
  const lugar = LUGARES[Math.floor(Math.random() * LUGARES.length)];
  const fecha = `2025-05-${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}`;
  const hora = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${['00', '30'][Math.floor(Math.random() * 2)]}`;

  return { nombre, cedula, telefono, cantidadpersonas, lugar, fecha, hora };
}
