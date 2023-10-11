import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Anime } from '../../models/anime.model';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { AnimesService } from '../../services/anime.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimeListComponent implements OnInit {

  animes$!: Observable<Anime[]>;
  loading$!: Observable<boolean>;

  searchCtrl!: FormControl;

  constructor(private animeService: AnimesService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.animeService.getAnimesFromServer();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
  }

  private initObservables() {
    this.loading$ = this.animeService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    this.animes$ = combineLatest([
      search$,
      this.animeService.animes$
    ]).pipe(
      map(([search, animes]) => animes.filter(anime => anime.title
          .toLowerCase()
          .includes(search as string))
      )
    );
  }

}
