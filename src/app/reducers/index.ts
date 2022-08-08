import {
  ActionReducerMap, createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { animalsFeatureKey, animalsReducer, IAnimalsState } from './animal/animal.reducer';
import * as animalsSelectors from './animal/animal.selectors';

export interface IState {
  [animalsFeatureKey]: IAnimalsState
}

export const reducers: ActionReducerMap<IState, any> = {
  [animalsFeatureKey]: animalsReducer
};

export const getAnimalsState = (state: IState): IAnimalsState => state[animalsFeatureKey];

export const getAnimalsList = createSelector(getAnimalsState, animalsSelectors.selectAnimalsList);
export const getFetchingAnimalsState = createSelector(getAnimalsState, animalsSelectors.selectFetchingAnimalsState);

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
