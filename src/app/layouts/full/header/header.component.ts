import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor(private sessionService: SessionService, private router: Router) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.sessionService.checkSession().subscribe((res: any) => {
    //   if (res.loggedIn) {
    //     console.log('Sesión activa:', res.user);
    //     // Aquí puedes redirigir al usuario a otra página si ya está logueado
    //     // Por ejemplo, redirigir al dashboard
    //     // this.router.navigate(['/dashboard']);
    //     //  return this.router.navigate(['/dashboard']); // o donde desees redirigir
    //   } else {
    //     console.log('No hay sesión activa');
    //   }
    // });
  }

  logout() {
    this.sessionService.logout().subscribe({
      next: () => {
        console.log('Sesión cerrada correctamente');
        // Redirigir al login o página de inicio
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }

}