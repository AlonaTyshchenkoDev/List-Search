import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { IAnimalData } from '../../../../interfaces/global.interfaces';
import { DataService } from '../../../../services/data/data.service';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.scss']
})
export class AnimalPageComponent implements OnInit, OnDestroy {
  public destroy$: Subject<void> = new Subject<void>();

  public animalData: IAnimalData | undefined;
  public errorMessage: string | null = null;
  public isLoading: boolean = true;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getParams(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          if (!params) return;
          this.getAnimalById(+params['id']);
        }
      });
  }

  getAnimalById(id: number): void {
    this.dataService.getAnimalById(id)
      .subscribe({
        next: (animalData) => {
          if (!animalData) {
            this.isLoading = false;
            this.errorMessage = 'Element not found!'
            return;
          }
          this.animalData = animalData;
          this.isLoading = false;
        },
        error: (error) => {
          console.log('getAnimalById error', error);
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
  }
}
