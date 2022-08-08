import { AnimalActions, animalsActionsType } from './animal.actions';
import { IAnimalData } from '../../interfaces/global.interfaces';

export const animalsFeatureKey = 'animals';

export interface IAnimalsState {
  data: IAnimalData[],
  isFetching: boolean,
  isError: boolean
  amount: number,
}

export const initialState: IAnimalsState = {
  data: [],
  amount: 0,
  isFetching: true,
  isError: false
};

export const animalsReducer = (state = initialState, action: AnimalActions) => {
  switch (action.type) {
    case animalsActionsType.loadAnimalsListAction:
      return {
        ...state,
        isError: false,
        isFetching: true
      };
    case animalsActionsType.loadSearchAnimalsListAction:
      const isFirstRequest = action.payload.isConcat;
      return {
        data: isFirstRequest ? [...state.data]: [],
        amount: 0,
        isError: false,
        isFetching: true
      };
    case animalsActionsType.loadAnimalsListActionSuccess:
      const isConcat = action.payload.isConcat;
      return {
        data: isConcat ? [...state.data, ...action.payload.data] : action.payload.data,
        amount: action.payload.amount,
        isError: false,
        isFetching: false
      };
    case animalsActionsType.loadAnimalsListActionFailed:
      return {
        ...state,
        isError: true,
        isFetching: false
      };
    case animalsActionsType.clearSearchAnimalsListAction:
      return {
        data: [],
        amount: 0,
        isError: true,
        isFetching: false
      };
    default:
      return state;
  }
};
