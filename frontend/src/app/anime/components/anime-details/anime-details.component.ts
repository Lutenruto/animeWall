import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Anime } from '../../models/anime.model';
import { AnimesService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimeDetailsComponent implements OnInit {

  loading$!: Observable<boolean>;
  anime$!: Observable<Anime>;
  animeId!: string;

  constructor(private animesService: AnimesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initObservables();
    this.animeId = this.route.snapshot.params['id'];
    console.log(this.animeId);
    
    this.anime$ = this.animesService.getAnimeById(this.animeId);
    console.log(this.anime$);
    
  }

  initObservables() {
    this.loading$ = this.animesService.loading$;
  }

  onEdit() {

  }

  onDelete() {
    this.anime$.pipe(
      take(1),
      tap(anime => {
        this.animesService.deleteAnime(anime._id);
        this.onGoBack();
      })
    ).subscribe();
  }
  
  onGoBack() {
    this.router.navigateByUrl('/anime');
  }
}
