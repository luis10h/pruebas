import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

interface sexo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
    providers: [provideNativeDateAdapter()],
  
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
    MatCheckboxModule,
RouterModule,
  MatTimepickerModule,
    MatDatepickerModule
  ],
  templateUrl: './form-add-taxista.component.html',
})
export class AppFormsComponent {

  value: Date;
  selectedValue: string;

//  public formBuscar!: FormGroup;
  public formAgregar!: FormGroup;
  public cedula: any;
  public nombre!: any;
  public numero_placa!: any;
  public telefono!: any;
  public fecha_nacimiento!: any;
  public sexo!: any;



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.formBuscar = this.crearFormularioSedes();
    this.formAgregar = this.crearFormularioAgregar();
  }

    private crearFormularioAgregar(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      numero_placa: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });
  }
   sexo_s: sexo[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
}
