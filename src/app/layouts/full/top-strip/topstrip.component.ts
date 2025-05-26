import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SessionService } from 'src/app/services/session.service';
SessionService
@Component({
    selector: 'app-topstrip',
    imports: [TablerIconsModule, MatButtonModule, MatMenuModule],
    templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent implements OnInit {
    user: any;

    constructor(private sessionService: SessionService) { }

    ngOnInit() {
        this.sessionService.checkSession().subscribe((res: any) => {
            if (res.loggedIn) {
                this.user = res.user;
                console.log('Sesión activa:', this.user);
            } else {
                console.log('No hay sesión activa');
            }
        });
    }


}
