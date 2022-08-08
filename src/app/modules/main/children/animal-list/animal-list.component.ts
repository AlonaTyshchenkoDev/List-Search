import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';

import { IAnimalData } from '../../../../interfaces/global.interfaces';
import {
  getAnimalsList,
  getFetchingAnimalsState,
  IState
} from '../../../../reducers';
import {
  ClearSearchAnimalsListAction,
  LoadAnimalsListAction,
  LoadSearchAnimalsListAction
} from '../../../../reducers/animal/animal.actions';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit, OnDestroy {

  public animalsList$: Observable<{ amount: number, data: IAnimalData[] }>;
  public isFetchingAnimals$: Observable<boolean>;
  public destroy$: Subject<void> = new Subject<void>();

  public searchGroup: FormGroup;
  public currentPage: number = 0;
  public searchValue: string = '';

  constructor(
    private store: Store<IState>,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAnimalList();
    this.getFetchingAnimalsState();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.resetListState();
  }

  initForm(): void {
    this.searchGroup = this.formBuilder.group({
      search: [null]
    });
    this.searchGroup.get('search')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(400), // discard emitted values that take less than the specified time between output
        distinctUntilChanged()
      )
      .subscribe(
         (searchValue) => {
          this.searchValue = searchValue;
          if (!searchValue) {
            this.resetListState();
            return;
          }
          this.currentPage = 0;
          this.searchAnimalsBy();
        }
      )
  }

  getAnimalList(): void {
    this.animalsList$ = this.store.select(getAnimalsList);
  }

  getFetchingAnimalsState(): void {
    this.isFetchingAnimals$ = this.store.select(getFetchingAnimalsState);
  }

  resetListState(): void {
    this.currentPage = 0;
    this.store.dispatch(new ClearSearchAnimalsListAction());
    this.store.dispatch(new LoadAnimalsListAction({ page: this.currentPage, isConcat: false }));
  }

  loadMoreAnimals(): void {
    if (this.searchValue.length) {
      this.searchAnimalsBy();
      return;
    }
    this.currentPage = this.currentPage + 1;
    this.store.dispatch(new LoadAnimalsListAction({ page: this.currentPage, isConcat: true }));
  }

  searchAnimalsBy(): void {
    this.store.dispatch(new LoadSearchAnimalsListAction({
      page: this.currentPage,
      searchValue: this.searchValue,
      isConcat: this.currentPage > 0
    }));
    this.currentPage = this.currentPage + 1;
  }
}
