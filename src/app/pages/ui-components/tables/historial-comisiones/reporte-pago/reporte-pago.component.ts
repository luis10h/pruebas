import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { F } from '@angular/cdk/scrolling-module.d-ud2XrbF8';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-reporte-pagos',
  templateUrl: './reporte-pago.component.html',
  styleUrls: ['./reporte-pago.component.scss']
})
export class ReportePagosComponent {
  reporte: any[] = [];
  cedulaFiltro = '';
  estadoFiltro = '';
  fechaInicio = '';
  fechaFin = '';

  totalGeneral = 0;
  totalPagado = 0;
  totalPendiente = 0;

  constructor(private http: HttpClient) {}

  cargarReporte() {
    const params = {
      cedula: this.cedulaFiltro,
      estado: this.estadoFiltro,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
    };

    this.http.get<any[]>('https://neocompanyapp.com/php/comisiones/reportes_pagos.php', { params }).subscribe(data => {
      this.reporte = data;
      this.totalGeneral = data.reduce((s, i) => s + Number(i.total_a_pagar), 0);
      this.totalPagado = data.reduce((s, i) => s + Number(i.pagado), 0);
      this.totalPendiente = this.totalGeneral - this.totalPagado;
    });
  }

  exportarExcel(): void {
    const dataExport = this.reporte.map(r => ({
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
