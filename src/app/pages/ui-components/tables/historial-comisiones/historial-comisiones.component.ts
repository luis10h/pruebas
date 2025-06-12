import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComisionService } from 'src/app/services/comision-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private comisionService: ComisionService, private router: Router, private route: ActivatedRoute) {
    this.cargarComisiones();
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
  cedula = '123456';
  estadoFiltro = '';
  fechaInicio = '';
  fechaFin = '';

  nuevo = {
    cedula: '123456',
    company_code: 'neodondeolano7226user',
    nombre: 'Taxista Olano de Prueba 2',
    numero_placa: 'ABC123',
    personas_referidas: 0,
    estado: 'no-pagado',
    observaciones: '',
    total_a_pagar: 0,
    pagado: 0
  };

  cargarComisiones() {
    this.comisionService.getComisiones(this.cedula, this.estadoFiltro, this.fechaInicio, this.fechaFin)
      .subscribe(data => this.comisiones = data);
  }

  cambiarEstado(id: number, estado: string) {
    this.comisionService.updateEstado(id, estado).subscribe(() => this.cargarComisiones());
  }

  abrirFormulario(comision: any) {
    this.router.navigate(['dashboard/view/add-comisiones', comision.cedula]);
  }
  
}
