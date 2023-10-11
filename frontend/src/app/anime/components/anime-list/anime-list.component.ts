import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Anime } from '../../models/anime.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AnimesService } from '../../services/anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimeListComponent implements OnInit {

  animes$!: Observable<Anime[]>;
  loading$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, 
              private animeService: AnimesService) { }

  ngOnInit(): void {
    this.initObservables();
    this.animeService.getAnimesFromServer();
  }

  private initObservables() {
    this.loading$ = this.animeService.loading$;
    this.animes$ = this.animeService.animes$;
  }

}
