import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComisionService } from 'src/app/services/comision-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogPagoTotalComponent } from '../tables.component';
import { MatDialog } from '@angular/material/dialog';
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

  cargarComisiones() {
    this.comisionService.getComisiones(this.cedula, this.estadoFiltro, this.fechaInicio, this.fechaFin)
      .subscribe(data => {
        this.comisiones = data;
        this.totalComisiones = this.comisiones.reduce((sum, item) => sum + Number(item.total_a_pagar), 0);
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
    const dialogRef = this.dialog.open(DialogPagoTotalComponent, {
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

}
