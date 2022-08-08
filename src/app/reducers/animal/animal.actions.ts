import { Action } from '@ngrx/store';

import { IAnimalData } from '../../interfaces/global.interfaces';

export enum animalsActionsType {
  loadAnimalsListAction = '[Animals] Load animals list action',
  loadAnimalsListActionSuccess = '[Animals] Load animals list action success',
  loadAnimalsListActionFailed = '[Animals] Load animals list action failed',
  loadSearchAnimalsListAction = '[Animals] Load search animals list action',
  loadSearchAnimalsListActionSuccess = '[Animals] Load search animals list action success',
  clearSearchAnimalsListAction = '[Animals] Clear search animals list action',
}

export class LoadAnimalsListAction implements Action {
  readonly type = animalsActionsType.loadAnimalsListAction;

  constructor(public payload: { page: number, isConcat: boolean }) {
  }
}

export class LoadAnimalsListActionSuccess implements Action {
  readonly type = animalsActionsType.loadAnimalsListActionSuccess;

  constructor(public payload: { amount: number, data: IAnimalData[], isConcat: boolean }) {
  }
}

export class LoadAnimalsListActionFailed implements Action {
  readonly type = animalsActionsType.loadAnimalsListActionFailed;

  constructor(public payload: { error: any }) {
  }
}

export class LoadSearchAnimalsListAction implements Action {
  readonly type = animalsActionsType.loadSearchAnimalsListAction;

  constructor(public payload: { page: number, isConcat: boolean, searchValue: string }) {
  }
}

export class ClearSearchAnimalsListAction implements Action {
  readonly type = animalsActionsType.clearSearchAnimalsListAction;
}

export type AnimalActions =
  LoadAnimalsListAction
  | LoadAnimalsListActionSuccess
  | LoadAnimalsListActionFailed
  | LoadSearchAnimalsListAction
  | ClearSearchAnimalsListAction;
