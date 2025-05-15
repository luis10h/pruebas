import { Component, OnInit } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';

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
export class AppFormComisionesComponent implements OnInit {
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
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  private apiUrlBuscar = 'https://neocompanyapp.com/php/comisiones/buscar_taxistas.php';
  private apiUrlAgregar = 'https://neocompanyapp.com/php/comisiones/guardar_comisiones.php';
  // private apiUrlPruebas = 'http://localhost/php/comisiones/buscar_taxistas.php';
  consultarPorCedula(cedula: string) {
    if (!cedula) return;

    this.http.post<any>(this.apiUrlBuscar, { cedula })
      .subscribe({
        next: (data) => {
          if (data && data.success) {
            this.formAgregar.patchValue({
              nombre: data.taxista.nombre,
              numero_placa: data.taxista.numero_placa,
              personas_referidas: data.taxista.personas_referidas,
              estado: data.taxista.estado,
              observaciones: data.taxista.observaciones
            });
            this.formActivo = true;
          } else {
            alert('Taxista no encontrado.');
            this.formActivo = false;
          }
        },
        error: (err) => {
          console.error('Error en la búsqueda:', err);
          alert('Error al consultar.');
        }
      });
  }
  ngOnInit(): void {
    this.formBuscar = this.crearFormularioConsultar();
    this.formAgregar = this.crearFormularioAgregar();
  }
  private crearFormularioConsultar(): FormGroup {
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
      observaciones: [''],
    });
  }
  formActivo: boolean = false;

 guardarComision() {
  if (this.formAgregar.valid) {
    const data = {
      cedula: this.formBuscar.get('cedula')?.value,
      ...this.formAgregar.value,
      total: this.calcularComision(this.formAgregar.get('personas_referidas')?.value)
    };

    fetch(this.apiUrlAgregar, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        alert('¡Comisión guardada correctamente!');
        this.formAgregar.reset();
        this.formBuscar.reset();
        this.formActivo = false;
      } else {
        alert('Error: ' + response.message);
      }
    })
    .catch(error => {
      console.error('Error al guardar:', error);
    });
  }
}

  comision_por_cliente = 5;

  calcularComision(clientes: any): number {
    const num = Number(clientes);
    return isNaN(num) ? 0 : num * this.comision_por_cliente;
  }
}
