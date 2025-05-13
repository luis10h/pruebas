import { Component , ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';


interface lugares {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-form-add-reserva',
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
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    RouterModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-add-reserva.component.html',
  styles: ``
})
export class FormAddReservaComponent {

  value: Date;

  selectedValue: string;
 

  lugares: lugares[] = [
    {value: 'Dentro', viewValue: 'Dentro'},
    {value: 'Fuera', viewValue: 'Fuera'},
  ];
  // public formBuscar!: FormGroup;
  public formAgregar!: FormGroup;
  public cedula: any;
  public nombre!: any;  
  public telefono!: any;
  public fecha_reserva!: any;
  public hora_reserva!: any;
  public lugar_reserva!: any;
  public observaciones!: any;
 constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.formBuscar = this.crearFormularioSedes();
    this.formAgregar = this.crearFormularioAgregar();
  }

    private crearFormularioAgregar(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      lugar_reserva: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fecha_reserva: ['', [Validators.required]],
      hora_reserva: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
    });
  }
}
