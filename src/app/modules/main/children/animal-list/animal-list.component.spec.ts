import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { getAnimalsList, getFetchingAnimalsState, IState } from '../../../../reducers';
import { IAnimalsState } from '../../../../reducers/animal/animal.reducer';
import { ClearSearchAnimalsListAction, LoadAnimalsListAction, LoadSearchAnimalsListAction
} from '../../../../reducers/animal/animal.actions';

import { AnimalListComponent } from './animal-list.component';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;
  let store: MockStore<IState>;
  let initFormSpy: jasmine.Spy;
  let getAnimalListSpy: jasmine.Spy;
  let getFetchingAnimalsStateSpy: jasmine.Spy;

  const initialState: IAnimalsState = {
    data: [{id: 1, name: 'name', description: 'info', imageUrl: 'src'}],
    amount: 0,
    isFetching: true,
    isError: false
  }

  beforeEach(waitForAsync (() => {
      TestBed.configureTestingModule({
      declarations: [ AnimalListComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [
        FormBuilder,
        provideMockStore({initialState}) ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    initFormSpy = spyOn(component, 'initForm').and.stub();
    getAnimalListSpy = spyOn(component, 'getAnimalList').and.stub();
    getFetchingAnimalsStateSpy = spyOn(component, 'getFetchingAnimalsState').and.stub();

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with one control', () => {
    initFormSpy.and.callThrough();

    component.initForm();

    expect(component.searchGroup.contains('search')).toBeTruthy();
  });

  it('should get searchvalue', fakeAsync(() => {
    initFormSpy.and.callThrough();

    component.initForm();
    component.searchGroup.get('search')?.setValue('test');
    tick(400);

    expect(component.searchValue).toEqual('test')
  }));

  it('should get data list from store', () => {
    const result = getAnimalsList.projector(initialState);

    component.getAnimalList();

    expect(result.data.length).toBe(1);
    expect(result.data[0].id).toBe(1);
  });

  it('should get value isFetching from store', () => {
    const result = getFetchingAnimalsState.projector(initialState);

    component.getFetchingAnimalsState();

    expect(result).toBeTruthy();
  });

  it('should dispatch two actions after calling method resetListState', () => {
    const payload = {page: 0, isConcat: false}
    const dispatchSpy = spyOn(store, 'dispatch').and.stub();

    component.resetListState();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy.calls.allArgs()).toEqual([
      [ new ClearSearchAnimalsListAction() ],
      [ new LoadAnimalsListAction(payload)]
    ]);
  });

  it('should search animal in store', () => {
    const payload = {page: 0, searchValue: component.searchValue, isConcat: false};
    const dispatchSpy = spyOn(store, 'dispatch').and.stub();

    component.searchAnimalsBy();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.calls.allArgs()).toEqual([[new LoadSearchAnimalsListAction(payload)]]);
  });

});
