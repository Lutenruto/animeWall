import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environnements/environnement';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // login(email: string, password: string) {
  //   return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  // }
  login(email: string, password: string) {
    return this.http.post<{ token: string, userId: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirigez l'utilisateur vers la page de connexion ou la page d'accueil
  }

  signup(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, { email, password });
  }
}
