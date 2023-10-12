import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimeListComponent } from "./components/anime-list/anime-list.component";
import { AnimesResolver } from "./resolvers/animes.resolver";
import { AnimeDetailsComponent } from "./components/anime-details/anime-details.component";
import { NewAnimeComponent } from "./components/new-anime/new-anime.component";


const routes: Routes = [
  { path: 'add', component: NewAnimeComponent },
  { path: ':id', component: AnimeDetailsComponent },
  { path: '', component: AnimeListComponent, resolve: { animes: AnimesResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AnimeRoutingModule { }