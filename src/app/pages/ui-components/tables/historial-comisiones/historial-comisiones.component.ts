import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ComisionService } from 'src/app/services/comision-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
// import { DialogPagoTotalComponent } from '../tables.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-historial-comisiones',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './historial-comisiones.component.html',
  styleUrls: ['./historial-comisiones.component.scss']
})
export class HistorialComisionesComponent {
  constructor(private comisionService: ComisionService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    // this.cargarComisiones();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(params => {
      const cedula = params.get('cedula');
      if (cedula) {
        // this.modoFormulario = 'editar';
        // this.cargarDatosTaxista(cedula);
        this.cedula = cedula;
        this.cargarComisiones();
      }
    });
  }
  comisiones: any[] = [];
  cedula = '';
  estadoFiltro = '';
  fechaInicio = '';
  fechaFin = '';

  // nuevo = {
  //   cedula: this.comisiones[0]?.cedula,
  //   company_code: this.comisiones[0]?.company_code,
  //   nombre: this.comisiones[0]?.nombre,
  //   numero_placa: this.comisiones[0]?.numero_placa,
  //   personas_referidas: 0,
  //   estado: 'no-pagado',
  //   observaciones: '',
  //   total_a_pagar: 0,
  //   pagado: 0
  // };
  totalComisiones: any;
  totalAbonado: any;
  totalPagado: any;

  cargarComisiones() {
    this.comisionService.getComisiones(this.cedula, this.estadoFiltro, this.fechaInicio, this.fechaFin)
      .subscribe(data => {
        this.comisiones = data;
        this.totalComisiones = this.comisiones.reduce((sum, item) => sum + Number(item.total_a_pagar), 0);
        // this.totalAbonado = this.totalComisiones - this.totalPagado || 0;
        this.totalPagado = this.comisiones.reduce((sum, item) => sum + Number(item.pagado), 0);
      });
  }

  cambiarEstado(id: number, estado: string) {
    this.comisionService.updateEstado(id, estado).subscribe(() => this.cargarComisiones());
  }

  abrirFormulario(comision: any) {
    this.router.navigate(['dashboard/view/add-comisiones', comision.cedula]);
  }

  pagarCompleto(element: any): void {
    console.log('Pagar completo', element);
    const dialogRef = this.dialog.open(DialogPagoTotalHistorialComponent, {
      data: {
        element,
        totalComisiones: this.totalComisiones
      },
      // disableClose: true,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cargarComisiones();
      }
    });
  }
  abrirDialogAbonar(comision: any): void {
    const dialogRef = this.dialog.open(DialogAbonarHistorialComponent, {
      data: comision,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cargarComisiones();
      }
    });
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
    MatInputModule,
    CommonModule,
    // ReactiveFormsModule,
    MatIconModule
  ],
  template: `
  <!-- cerrar -->
  <button mat-button (click)="closeDialog()"><mat-icon>close</mat-icon> Cerrar</button>
  <h2 mat-dialog-title style="text-align: center;">Abonar Pago</h2>
  <mat-dialog-content style="text-align: center;">
    <p>Ingrese monto a abonar para: {{ data.title || data.uname || data.nombre }}</p>
    <mat-form-field appearance="outline" class="w-100" color="primary" style="width: 100%;">
      <mat-label>Monto</mat-label>
      <input matInput #monto placeholder="0" type="number"/>
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancelar</button>
    <button mat-raised-button color="primary" (click)="confirmarAbono(monto.value)">Confirmar</button>
  </mat-dialog-actions>
`,
})
export class DialogAbonarHistorialComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAbonarHistorialComponent>,
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

    this.http.post('https://neocompanyapp.com/php/comisiones/abono_comisiones.php', {
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
        this.dialogRef.close(true);
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
  closeDialog(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'dialog-pago-total',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Pago Total</h2>
    <mat-dialog-content>
      <p>Confirmar pago total para: {{ data.title || data.uname || data.nombre || data.element.nombre}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" (click)="submit()">Confirmar</button>
    </mat-dialog-actions>
  `,
})
export class DialogPagoTotalHistorialComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogPagoTotalHistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Datos recibidos en el diálogo:', data.cedula || data.element?.cedula || data.cedula);
    console.log('Monto total:', data.total_a_pagar || data.element?.total_a_pagar || data.total || 0);

  }

  submit() {
    const monto =
      this.data?.total ??
      this.data?.total_a_pagar ??
      this.data?.element?.total_a_pagar ??
      0;

    if (monto <= 0) {
      console.error('Monto inválido');
      return;
    }

    const cedula =
      this.data?.cedula ??
      this.data?.element?.cedula ??
      '';
      const id =
      this.data?.id ??
      this.data?.element?.id ??
      ''  ;

    this.http.post('https://neocompanyapp.com/php/comisiones/abono_comisiones.php', {
      monto,
      cedula,
      id
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
        });
        this.dialogRef.close(true);
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