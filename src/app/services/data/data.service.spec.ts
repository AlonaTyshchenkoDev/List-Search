import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { DataService } from './data.service';
import { IAnimalData } from '../../interfaces/global.interfaces';

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DataService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get animal list from db', () => {
    const expectedResult: { amount: number, data: IAnimalData[] } = {
      amount: 1, data: [{id: 1, name:'name', description: 'info', imageUrl: 'src'}]
    }
    httpClientSpy.get.and.returnValue(of(expectedResult));
    service.getAnimalsList(0).subscribe({
      next: (res) => {
        expect(res)
          .withContext('expectedResult')
          .toEqual(expectedResult)
      }
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should get animal by id from db', () => {
    const result: IAnimalData[] = [
      {id: 1, name:'name', description: 'info', imageUrl: 'src'},
      {id: 2, name:'name2', description: 'info2', imageUrl: 'src2'}
    ];

    httpClientSpy.get.and.returnValue(of(result.find(item => item.id == 2)));
    service.getAnimalById(1).subscribe({
      next: (res) => {
        expect(res)
          .withContext('result')
          .toEqual(result[1])
      }
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service.getAnimalsList(0).subscribe({
      next: () => done.fail('expected an error'),
      error: error  => {
        expect(error.status).toEqual(404);
        done();
      }
    });
  });

});
