import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { AnimeListItemComponent } from './components/anime-list-item/anime-list-item.component';
import { NewAnimeComponent } from './components/new-anime/new-anime.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimesService } from './services/anime.service';
import { AnimesResolver } from './resolvers/animes.resolver';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AnimeListComponent,
    AnimeListItemComponent,
    NewAnimeComponent,
    AnimeDetailsComponent,
  ],
  imports: [
    CommonModule,
    AnimeRoutingModule,
    SharedModule
  ],
  providers: [
    AnimesService,
    AnimesResolver
  ]
})
export class AnimeModule { }
