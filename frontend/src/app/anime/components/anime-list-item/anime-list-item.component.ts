import { Component, Input, OnInit } from '@angular/core';
import { Anime } from '../../models/anime.model';
import { Observable } from 'rxjs';
import { AnimesService } from '../../services/anime.service';

@Component({
  selector: 'app-anime-list-item',
  templateUrl: './anime-list-item.component.html',
  styleUrls: ['./anime-list-item.component.scss']
})
export class AnimeListItemComponent implements OnInit {

  @Input() anime!: Anime;

  animes$!: Observable<Anime[]>;
  loading$!: Observable<boolean>;

  constructor(private animeService: AnimesService) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.animeService.loading$;
    this.animes$ = this.animeService.animes$;
  }
}
