import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './component/main.component';
import { AnimalListComponent } from './children/animal-list/animal-list.component';
import { AnimalPageComponent } from './children/animal-page/animal-page.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    AnimalListComponent,
    AnimalPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
