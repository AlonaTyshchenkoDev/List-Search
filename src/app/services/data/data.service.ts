import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { IAnimalData } from '../../interfaces/global.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  getAnimalsList(page: number, limit: number = 10): Observable<{ amount: number, data: IAnimalData[] }> {
    return this.httpClient.get<IAnimalData[]>('/assets/animal.json')
      .pipe(
        delay(1000),
        catchError(error => throwError(error)),
        map(animalsList => ({
          amount: animalsList.length,
          data: animalsList.slice(page * limit, page * limit + 10)
        }))
      );
  }

  searchAnimalsList(page: number, searchValue: string, limit: number = 10): Observable<{ amount: number, data: IAnimalData[] }> {
    return this.httpClient.get<IAnimalData[]>('/assets/animal.json')
      .pipe(
        delay(1000),
        catchError(error => throwError(error)),
        map(animalsList => {
          const searchList = animalsList.filter(animal => {
            const isNameIncludes = animal.name.toLowerCase().includes(searchValue.toLowerCase());
            const isDescriptionIncludes = animal.description.toLowerCase().includes(searchValue.toLowerCase());
            return isNameIncludes || isDescriptionIncludes;
          });
          return {
            amount: searchList.length,
            data: searchList.slice(page * limit, page * limit + 10)
          }
        })
      );
  }

  getAnimalById(id: number): Observable<IAnimalData | undefined> {
    return this.httpClient.get<IAnimalData[]>('/assets/animal.json')
      .pipe(
        delay(1000),
        catchError(error => throwError(error)),
        map(animalsList => animalsList.find(animal => animal.id === id))
      );
  }
}
