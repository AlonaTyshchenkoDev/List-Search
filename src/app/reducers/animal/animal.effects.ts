import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import { DataService } from '../../services/data/data.service';
import {
  animalsActionsType,
  LoadAnimalsListActionFailed,
  LoadAnimalsListActionSuccess
} from './animal.actions';

@Injectable()
export class AnimalsEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {
  }

  loadAnimals$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActionsType.loadAnimalsListAction),
    switchMap(({ payload }: { type: string, payload: { page: number, isConcat: boolean } }) => {
      return this.dataService.getAnimalsList(payload.page)
        .pipe(
          map((animalsList) => new LoadAnimalsListActionSuccess({ ...animalsList, isConcat: payload.isConcat })),
          catchError((error) => of(new LoadAnimalsListActionFailed({ error })))
        );
    })
  ));

  searchAnimals$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActionsType.loadSearchAnimalsListAction),
    switchMap(({ payload }: { type: string, payload: { page: number, searchValue: string, isConcat: boolean } }) => {
      return this.dataService.searchAnimalsList(payload.page, payload.searchValue)
        .pipe(
          map((animalsList) => new LoadAnimalsListActionSuccess({ ...animalsList, isConcat: payload.isConcat })),
          catchError((error) => of(new LoadAnimalsListActionFailed({ error })))
        );
    })
  ));
}
