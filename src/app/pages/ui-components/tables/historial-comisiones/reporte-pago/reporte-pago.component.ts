import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatOption,
    MatPaginatorModule
  ],
  selector: 'app-reporte-pagos',
  templateUrl: './reporte-pago.component.html',
  styleUrls: ['./reporte-pago.component.scss']
})
export class ReportePagosComponent implements AfterViewInit {
  cedulaFiltro = '';
  estadoFiltro = '';
  fechaInicio = '';
  fechaFin = '';

  totalGeneral = 0;
  totalPagado = 0;
  totalPendiente = 0;

  columnas: string[] = ['fecha', 'nombre', 'cedula', 'estado', 'total_a_pagar', 'pagado', 'pendiente'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarReporte() {
    const params = {
      cedula: this.cedulaFiltro,
      estado: this.estadoFiltro,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
    };

    this.http.get<any[]>('https://neocompanyapp.com/php/comisiones/reportes_pagos.php', { params }).subscribe(data => {
      this.dataSource.data = data;
      this.totalGeneral = data.reduce((s, i) => s + Number(i.total_a_pagar), 0);
      this.totalPagado = data.reduce((s, i) => s + Number(i.pagado), 0);
      this.totalPendiente = this.totalGeneral - this.totalPagado;
    });
  }

  exportarExcel(): void {
    const dataExport = this.dataSource.data.map(r => ({
      Fecha: r.fecha,
      Nombre: r.nombre,
      Cédula: r.cedula,
      Estado: r.estado,
      'Total ($)': r.total_a_pagar,
      'Pagado ($)': r.pagado,
      'Pendiente ($)': r.total_a_pagar - r.pagado
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
    const wb: XLSX.WorkBook = { Sheets: { 'Pagos': ws }, SheetNames: ['Pagos'] };

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `Reporte_Pagos_${new Date().toISOString().split('T')[0]}.xlsx`);
  }
}
