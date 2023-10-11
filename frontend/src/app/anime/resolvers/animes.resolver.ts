import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Anime } from '../models/anime.model';
import { AnimesService } from '../services/anime.service';
import { Observable } from 'rxjs';

@Injectable()
export class AnimesResolver implements Resolve<Anime[]> {
  constructor(private animesService: AnimesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Anime[]> {
    return this.animesService.getAnimes();
  }
}