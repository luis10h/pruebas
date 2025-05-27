import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  // <-- IMPORTANTE
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule  // <-- aquí también para que funcione en este componente si usas inputs
  ],
  standalone: true,
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = new MatTableDataSource<Taxistasdata>([]);
  imagenesPorId: { [key: number]: number } = {};

  public formBuscar!: FormGroup;

  private apiUrl = 'https://neocompanyapp.com/php/comisiones/tabla_comisiones.php';

  constructor(private http: HttpClient, private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get<Taxistasdata[]>(this.apiUrl).subscribe(
      data => {
        const safeData = Array.isArray(data) ? data : [];
        this.dataSource1 = new MatTableDataSource<Taxistasdata>(safeData);

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

        if (this.paginator) {
          this.dataSource1.paginator = this.paginator;
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
        this.dataSource1 = new MatTableDataSource<Taxistasdata>([]);
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

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
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

  pagarCompleto(element: any): void {
    this.dialog.open(DialogPagoTotalComponent, {
      data: element,
      width: '300px',
    });
  }

  abonar(element: any): void {
    this.dialog.open(DialogAbonarComponent, {
      data: element,
      width: '300px',
    });
  }
}

@Component({
  selector: 'dialog-pago-total',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Pago Total</h2>
    <mat-dialog-content>
      <p>Confirmar pago total para: {{ data.title || data.uname }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="confirmarPago()">Confirmar</button>
    </mat-dialog-actions>
  `,
})
export class DialogPagoTotalComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPagoTotalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmarPago() {
    console.log('Pago total confirmado para', this.data);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-abonar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule  // Para que funcione matInput
  ],
  template: `
  <h2 mat-dialog-title style="text-align: center;">Abonar Pago</h2>
  <mat-dialog-content style="text-align: center;">
    <p>Ingrese monto a abonar para: {{ data.title || data.uname }}</p>
    <mat-form-field appearance="outline" class="w-100" color="primary" style="width: 100%;">
      <mat-label>Monto</mat-label>
      <input matInput  [(ngModel)]="monto" placeholder="0" />
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancelar</button>
    <button mat-raised-button color="primary" (click)="confirmarAbono()">Confirmar</button>
  </mat-dialog-actions>
`,

})
export class DialogAbonarComponent {
  monto: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogAbonarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmarAbono() {
    console.log('Abono confirmado:', this.monto, 'para', this.data);
    this.dialogRef.close();
  }
}
