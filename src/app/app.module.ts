import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { delay, filter, first } from 'rxjs';

import { getAnimalsState, IState, metaReducers, reducers } from './reducers';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { DataService } from './services/data/data.service';
import { LoadAnimalsListAction } from './reducers/animal/animal.actions';
import { AnimalsEffects } from './reducers/animal/animal.effects';

function initializeApp(dataService: DataService, store: Store<IState>): () => Promise<boolean> {
  return () => new Promise(async (resolve, reject) => {
    store.dispatch(new LoadAnimalsListAction({ page: 0, isConcat: false }));
    store.select(getAnimalsState)
      .pipe(
        delay(2000), // Loading app initial data
        filter(animals => !animals.isFetching),
        first()
      )
      .subscribe({
        next: (animalsList) => {
          resolve(true);
        }
      });
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AnimalsEffects, ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DataService, Store],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
