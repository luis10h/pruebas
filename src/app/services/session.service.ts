// session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../pages/ui-components/tables/tabla-reservas.component';

interface SessionResponse {
  loggedIn: boolean;
  user?: UserData;
  message?: string;
}


@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private http: HttpClient) {}

  getSession() {
    // return this.http.get('http://localhost/php/auth/get_session.php');
    return this.http.get<SessionResponse>('https://neocompanyapp.com/php/auth/get_session.php', {
      withCredentials: true
    });
  }

  getSessionData() {
    return this.http.get('https://neocompanyapp.com/php/auth/get_session_data.php', {
      withCredentials: true
    });
  }

 logout() {
  // return this.http.get('http://localhost/php/auth/logout.php', {
  return this.http.get('https://neocompanyapp.com/php/auth/logout.php', {
    withCredentials: true
  });
}

  // auth.service.ts o similar
  checkSession() {
  return this.http.get<SessionResponse>('https://neocompanyapp.com/php/auth/get_session.php', {
    withCredentials: true
  });
}


}

