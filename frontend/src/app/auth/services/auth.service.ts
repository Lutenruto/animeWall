import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environnements/environnement';
import { delay, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken() {
    return this.cookieService.get('token');
  }

  constructor(private http: HttpClient,
             private cookieService: CookieService,
             private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string, userId: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.cookieService.set('token', response.token);
          this.cookieService.set('userId', response.userId);
          delay(1000);
          this.router.navigateByUrl('/anime');          
        })
      );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    this.router.navigateByUrl('/auth/login');
  }

  signup(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, { email, password });
  }
}
