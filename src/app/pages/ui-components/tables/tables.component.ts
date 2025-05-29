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
import { AppFormComisionesComponent } from '../forms/form-comisiones.component';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
import Swal from 'sweetalert2';

export interface Taxistasdata {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
  sexo: string | 'femenino' | 'masculino';
  company_code: string;
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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  cargarDatos(): void {
    this.http.get<Taxistasdata[]>(this.apiUrl).subscribe(
      
      data => {
        const safeData = Array.isArray(data) ? data : [];

        // Filtrar por company_name
        const filtrados = safeData.filter(item => item.company_code === this.sessionObj.user.company_code);

        this.dataSource1.data = filtrados

        // Mantener imágenes por sexo
        for (let card of filtrados) {
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
console.log('this.sessionObj:', this.sessionObj);
        if (this.paginator) {
          this.dataSource1.paginator = this.paginator;
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
        this.dataSource1 = new MatTableDataSource<Taxistasdata>([]);
      }
    );
  }






  sessionObj: any;
  ngOnInit(): void {
    this.formBuscar = this.crearFormularioConsultar();
    this.cargarDatos();
    const session = localStorage.getItem('session');
    if (session) {
      this.sessionObj = JSON.parse(session);
      console.log('Usuario en sesión desde comisiones:', this.sessionObj.user.username);
      console.log('ID de usuario desde comisiones:', this.sessionObj.user.company_code);
    } else {
      console.log('No hay usuario en sesión');
    }
    this.dataSource1.filterPredicate = (data: any, filter: string) => {
      const searchTerm = filter?.trim().toLowerCase() || '';
      const estado = this.getEstado(data)?.toLowerCase() || '';
      return (
        data?.title?.toLowerCase()?.includes(searchTerm) ||
        data?.cedula?.toString()?.includes(searchTerm) ||
        estado.includes(searchTerm)
      );
    };

    this.formBuscar.get('cedula')?.valueChanges.subscribe((value: string) => {
      let filtro = value.trim().toLowerCase();
      if (filtro === 'no pagado' || filtro === 'no comenzado') filtro = 'no-pagado';
      this.dataSource1.filter = filtro;
      if (filtro === 'pagado') filtro = 'pagado';
      this.dataSource1.filter = filtro;
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

  abrirFormulario(comision: any) {
    this.router.navigate(['dashboard/view/add-comisiones', comision.cedula]);

  }


  pagarCompleto(element: any): void {
    const dialogRef = this.dialog.open(DialogPagoTotalComponent, {
      data: element,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cargarDatos(); // Recargar tabla sin recargar página
      }
    });
  }


  abonar(element: any): void {
    const dialogRef = this.dialog.open(DialogAbonarComponent, {
      data: element,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cargarDatos();
      }
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
      <button mat-raised-button color="primary" (click)="submit()">Confirmar</button>
    </mat-dialog-actions>
  `,
})
export class DialogPagoTotalComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogPagoTotalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    console.log('Datos recibidos en el diálogo:', data.cedula);
    // this.formPago = this.fb.group({
    // monto: [data.total, [Validators.required, Validators.min(0)]],
    // });
  }
  monto: number = 0;
  confirmarPago() {
    console.log('Pago total confirmado para', this.data);
    this.dialogRef.close();
  }
  public formPago!: FormGroup;
  // formularioPago: FormGroup = this.fb.group({
  //   monto: ['', [Validators.required, Validators.min(0)]],
  // });
  // get monto() {
  //   return this.formularioPago.get('monto');
  // }
  get total() {
    return this.data.total;
  }

  submit() {
    if (!this.data?.total || this.data.total <= 0) {
      console.error('Monto inválido');
      return;
    }

    const monto = this.data.total;
    this.http.post('https://neocompanyapp.com/php/comisiones/pago_comisiones.php', {
      id: this.data.id,
      monto: this.data.total,
      cedula: this.data.cedula,
    }).subscribe({
      next: (response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast: any) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Pago exitoso",
          // text: "Los datos del taxista han sido cargados correctamente.",
        });
        console.log('Pago procesado:', response);
        this.dialogRef.close(true); // <- Indicamos éxito
      },
      error: (error) => {
        console.error('Error al procesar el pago:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo procesar el pago. Intente más tarde.'
        });
      }

    });
  }

}
// import { Router } from '@angular/router';

@Component({
  selector: 'dialog-abonar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    // Router  // Para que funcione matInput
  ],
  template: `
  <h2 mat-dialog-title style="text-align: center;">Abonar Pago</h2>
  <mat-dialog-content style="text-align: center;">
    <p>Ingrese monto a abonar para: {{ data.title || data.uname }}</p>
    <mat-form-field appearance="outline" class="w-100" color="primary" style="width: 100%;">
      <mat-label>Monto</mat-label>
      <input matInput #monto placeholder="0" type="number"/>
      <!-- {{ monto.value}} -->
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancelar</button>
    <button mat-raised-button color="primary" (click)="confirmarAbono(monto.value)">Confirmar</button>
  </mat-dialog-actions>
`,

})
export class DialogAbonarComponent {
  // monto: number = 0;
  // monto = get('monto');
  //  d = document.getElementById('montoValor');
  constructor(
    public dialogRef: MatDialogRef<DialogAbonarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router
  ) { }

  confirmarAbono(montoV: string) {
    const monto = parseFloat(montoV);

    if (isNaN(monto) || monto <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Monto inválido',
        text: 'Por favor ingrese un monto válido mayor a cero.'
      });
      return;
    }

    this.http.post('https://neocompanyapp.com/php/comisiones/pago_comisiones.php', {
      id: this.data.id,
      monto: monto,
      cedula: this.data.cedula,
    }).subscribe({
      next: (response) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast: any) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Abono registrado exitosamente",
        });
        this.dialogRef.close(true); // Éxito, recargar tabla
      },
      error: (error) => {
        console.error('Error al registrar abono:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el abono. Intente más tarde.'
        });
      }
    });
  }



}
