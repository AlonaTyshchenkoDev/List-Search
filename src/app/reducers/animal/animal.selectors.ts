import { IAnimalsState } from './animal.reducer';
import { IAnimalData } from '../../interfaces/global.interfaces';

export const selectAnimalsList = (state: IAnimalsState): { amount: number, data: IAnimalData[] } => ({
  amount: state.amount,
  data: state.data
});

export const selectFetchingAnimalsState = (state: IAnimalsState): boolean => state.isFetching;
