import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';

interface ApiResponse {
  success: boolean;
  message?: string;
  // puedes agregar más campos según lo que el backend devuelva
}


@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnDestroy {
  form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private sessionService: SessionService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //  this.sessionService.checkSession().subscribe((res: any) => {
  //           if (res.loggedIn) {
  //               console.log('Sesión activa:', res.user);
  //               // Aquí puedes redirigir al usuario a otra página si ya está logueado
  //               // Por ejemplo, redirigir al dashboard
  //               this.router.navigate(['/dashboard']);
  //             //  return this.router.navigate(['/dashboard']); // o donde desees redirigir
  //           } else {
  //               console.log('No hay sesión activa');
  //           }
  //       });
  // }
  get f() {
    return this.form.controls;
  }
  submit() {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    const url = 'https://neocompanyapp.com/php/auth/login.php';
    this.http.post<ApiResponse>(url, data, { withCredentials: true })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response.success) {
            alert('Login exitoso');
            this.router.navigateByUrl('/dashboard', { replaceUrl: true });

          } else {
            alert('Credenciales incorrectas');
            console.log(response.message);
          }
        },
        error: (error) => {
          alert('Error al conectar con el servidor');
          console.error(error);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}