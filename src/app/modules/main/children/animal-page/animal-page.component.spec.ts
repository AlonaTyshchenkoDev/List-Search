import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { DataService } from '../../../../services/data/data.service';

import { AnimalPageComponent } from './animal-page.component';

class DataServiceStub {
  getAnimalById(id: number): void {}
}

describe('AnimalPageComponent', () => {
  let component: AnimalPageComponent;
  let fixture: ComponentFixture<AnimalPageComponent>;
  let service: DataService;
  let route: ActivatedRoute;
  let paramsSubject = new BehaviorSubject({id: 99});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalPageComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: DataService, useClass: DataServiceStub},
        {provide: ActivatedRoute, useValue: {
            params: paramsSubject
          }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get info about an animal by id, which is taken from route.params', () => {
    route.params.subscribe(params => {
      expect(params['id']).toBe(99);
    });
    const spy = spyOn(component, 'getAnimalById');

    component.getParams();

    expect(spy).toHaveBeenCalledWith(99);
  })

});
