import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';


interface lugares {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-form-add-reserva',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatTooltipModule,
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-add-reserva.component.html',
  styles: ``
})
export class FormAddReservaComponent {

  value: Date;

  selectedValue: string;


  lugares: lugares[] = [
    { value: 'Dentro', viewValue: 'Dentro' },
    { value: 'Fuera', viewValue: 'Fuera' },
  ];
  public formAgregar!: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
  sessionObj: any;
  ngOnInit(): void {
    const session = localStorage.getItem('session');
    if (session) {
      this.sessionObj = JSON.parse(session);
      console.log('Usuario en sesión desde reservas:', this.sessionObj.user.username);
      console.log('ID de usuario desde comisiones:', this.sessionObj.user.company_code);
    } else {
      console.log('No hay usuario en sesión');
    }

    this.formAgregar = this.fb.group({
      nombre: ['', Validators.required],
      // company_code: [this.sessionObj.user.company_code],
      company_code: [this.sessionObj.user.company_code, [Validators.required]],

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
  // private apiUrlAgregar = 'http://localhost/php/reservas/guardar_reservas.php';  
  onSubmit() {
    if (this.formAgregar.valid) {
      const formData = this.formAgregar.value;

      this.http.post(this.apiUrlAgregar, formData).subscribe({
        next: (response) => {
          console.log('Reserva guardada:', response);
          // alert('Reserva registrada correctamente');
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
            title: "Reserva registrada.",
            // text: "Los datos del taxista han sido cargados correctamente.",
          });
          this.formAgregar.reset({
            nombre: '',
            company_code: this.sessionObj.user.company_code,
            lugar_reserva: '',
            cedula: '',
            telefono: '',
            fecha_reserva: '',
            hora_reserva: '',
            cantidad: '',
            observaciones: ''
          });
          Object.keys(this.formAgregar.controls).forEach(key => {
            const control = this.formAgregar.get(key);
            control?.markAsPristine();
            control?.markAsUntouched();
          });
            this.router.navigate(['/dashboard/view/tabla-reservas']);


        },
        error: (error) => {
          console.error('Error al guardar:', error);
          // alert('Error al registrar la reserva');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar la reserva.',
          });
        }
      });
    } else {
      // alert('Por favor completa todos los campos requeridos');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos requeridos.',
      });
    }
  }
}