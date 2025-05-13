import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface pago {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-comisiones',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './form-add-comisiones.component.html',
})
export class AppFormComisionesComponent {
  public formBuscar!: FormGroup;
  public formAgregar!: FormGroup;
  public cedula: any;
  public nombre!: any;
  public numero_placa!: any;
  public personas_referidas!: any;
  public estado!: any;
  public observaciones!: any;

  value: Date;
  selectedValue: string;
  pagos: pago[] = [
    { value: 'pagado', viewValue: 'Pagado' },
    { value: 'no-pagado', viewValue: 'No pagado' },
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formBuscar = this.crearFormularioSedes();
    this.formAgregar = this.crearFormularioAgregar();
  }
  private crearFormularioSedes(): FormGroup {
    return this.fb.group({
      cedula: ['', [Validators.required]],
    });
  }
    private crearFormularioAgregar(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      numero_placa: ['', [Validators.required]],
      personas_referidas: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
    });
  }
  formActivo: boolean = false;

  consultarPorCedula(cedula: string) {
    // Aquí podrías hacer una búsqueda con el valor de la cédula
    console.log('Buscando por cédula:', cedula);

    // Luego de consultar, habilitas los campos
    if (cedula) {
      this.formActivo = true; // Habilitar el formulario si se encuentra la cédula
    }

  }
  comision_por_cliente = 5;

  calcularComision(clientes: any): number {
    const num = Number(clientes);
    return isNaN(num) ? 0 : num * this.comision_por_cliente;
  }
}
