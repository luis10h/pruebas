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
  ],
  templateUrl: './tabla-taxistas.component.html',
  styleUrls: ['./tabla-taxistas.component.scss'],
})
export class TablaTaxistasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'cedula', 'telefono', 'placa', 'sexo', 'nacimiento'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser());
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
