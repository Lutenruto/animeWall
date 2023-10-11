import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, mapTo, of, switchMap, take, tap } from 'rxjs';
import { Anime } from '../models/anime.model';
import { environment } from 'src/app/environnements/environnement';

@Injectable()
export class AnimesService {
  constructor(private http: HttpClient) { }

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${environment.apiUrl}/anime`);
  }

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _animes$ = new BehaviorSubject<Anime[]>([]);
  get animes$(): Observable<Anime[]> {
    return this._animes$.asObservable();
  }

  private lastAnimesLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getAnimesFromServer() {
    if (Date.now() - this.lastAnimesLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Anime[]>(`${environment.apiUrl}/anime`).pipe(
      delay(1000),
      tap(animes => {
        this.lastAnimesLoad = Date.now();
        this._animes$.next(animes);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getAnimeById(id: string): Observable<Anime> {
    return this.http.get<Anime>(`${environment.apiUrl}/anime/${id}`);
  }

  deleteAnime(id: string): void {
    this.setLoadingStatus(true);
    this.http.delete<Anime>(`${environment.apiUrl}/anime/${id}`).pipe(
      delay(1000),
      switchMap(() => this.animes$),
      take(1),
      map(animes => animes.filter(anime => anime._id !== id)),
      tap(animes => {
        this._animes$.next(animes);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  updateAnime(anime: Anime, id: string): Observable<boolean> {
    return this.http.put(`${environment.apiUrl}/anime/${id}`, anime).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(delay(1000)))
    );
  }

}