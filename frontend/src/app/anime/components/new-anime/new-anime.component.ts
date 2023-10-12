import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AnimesService } from '../../services/anime.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-anime',
  templateUrl: './new-anime.component.html',
  styleUrls: ['./new-anime.component.scss']
})
export class NewAnimeComponent implements OnInit {

  loading$!: Observable<boolean>;
  addAnimeForm!: FormGroup;

  constructor(private animesService: AnimesService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initObservables();
    this.initForm();
  }

  initForm(): void {
    this.addAnimeForm = this.formBuilder.group({
      title: [''],
      imageUrl: [''],
      description: ['']
    });
  }

  initObservables() {
    this.loading$ = this.animesService.loading$;
  }
  
  onGoBack() {
    this.router.navigateByUrl('/anime');
  }

  onAddAnime() {
    this.animesService.addNewAnime(this.addAnimeForm.value, 'userID40282382').pipe(
      tap(data => {
        if(data) {
          console.log("Nouvel Anime");
          this.animesService.getAnimesFromServer(true);
        } else {
          console.log('Error');
        }
      })
    ).subscribe(() => {
      this.onGoBack();
    });
  }
}
