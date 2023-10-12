import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Anime } from '../../models/anime.model';
import { AnimesService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {

  loading$!: Observable<boolean>;
  anime$!: Observable<Anime>;
  animeId!: string;

  anime!: Anime;

  monUpdate!: FormGroup;

  titleCtrl!: FormControl;
  descriptionCtrl!: FormControl;
  imageUrlCtrl!: FormControl;

  constructor(private animesService: AnimesService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initObservables();
    this.initFormControl();
    this.initForm();
    this.animeId = this.route.snapshot.params['id'];    
    this.anime$ = this.animesService.getAnimeById(this.animeId);
    this.anime$.pipe(tap((data) => {
      this.anime = data;
      this.monUpdate.patchValue({
        title: data.title,
        imageUrl: data.imageUrl,
        description: data.description
      });
    })).subscribe();     
  }

  initFormControl(): void {
    this.titleCtrl = this.formBuilder.control('');
    this.descriptionCtrl = this.formBuilder.control('');
    this.imageUrlCtrl = this.formBuilder.control('');
  }

  initForm(): void {
    this.monUpdate = this.formBuilder.group({
      title: [''],
      imageUrl: [''],
      description: ['']
    });
  }

  initObservables() {
    this.loading$ = this.animesService.loading$;
  }

  onSaveChanges() {
    this.animesService.updateAnime(this.anime, this.animeId).pipe(
      tap(data => {
        if(data){
          console.log('Save');
          this.animesService.getAnimesFromServer(true);
        } else {
          console.log('Error');
        }
      })
    ).subscribe();
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
