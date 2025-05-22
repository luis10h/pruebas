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
import { HttpClient } from '@angular/common/http';


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
public formAgregar!: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.formAgregar = this.fb.group({
      nombre: ['', Validators.required],
      lugar_reserva: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_reserva: ['', Validators.required],
      hora_reserva: ['', Validators.required],
      cantidad: ['', Validators.required],
      observaciones: ['']
    });
  }
  private apiUrlAgregar = 'https://neocompanyapp.com/php/reservas/guardar_reservas.php';
  // private apiUrlPruebas = 'http://localhost/php/reservas/guardar_reservas.php';  
  onSubmit() {
    if (this.formAgregar.valid) {
      const formData = this.formAgregar.value;

      this.http.post(this.apiUrlAgregar, formData).subscribe({
        next: (response) => {
          console.log('Reserva guardada:', response);
          alert('Reserva registrada correctamente');
          this.formAgregar.reset();
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          alert('Error al registrar la reserva');
        }
      });
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  }
}