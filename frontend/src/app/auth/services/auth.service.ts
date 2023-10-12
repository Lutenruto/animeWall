import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environnements/environnement';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
             private cookieService: CookieService,
             private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string, userId: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.cookieService.set('token', response.token);
          this.cookieService.set('userId', response.userId);          
        })
      );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    // Redirigez l'utilisateur vers la page de connexion ou la page d'accueil
    this.router.navigateByUrl('/anime');
  }

  signup(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, { email, password });
  }
}
