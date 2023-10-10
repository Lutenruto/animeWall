import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { AnimeListItemComponent } from './components/anime-list-item/anime-list-item.component';
import { NewAnimeComponent } from './components/new-anime/new-anime.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';



@NgModule({
  declarations: [
    AnimeListComponent,
    AnimeListItemComponent,
    NewAnimeComponent,
    AnimeDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AnimeModule { }
