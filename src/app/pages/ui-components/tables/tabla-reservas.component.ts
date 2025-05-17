import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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
const LUGARES: string[] = ['Sala ', 'Terraza'];

@Component({
  selector: 'app-tabla-reservas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './tabla-reservas.component.html',
  styleUrl: './tabla-reservas.component.scss'
})
export class TablaReservasComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'telefono', 'cantidadpersonas', 'lugar', 'fecha', 'hora'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
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
