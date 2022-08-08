import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main.component';
import { AnimalListComponent } from './children/animal-list/animal-list.component';
import { AnimalPageComponent } from './children/animal-page/animal-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'animal-list'
      },
      {
        path: 'animal-list',
        component: AnimalListComponent
      },
      {
        path: 'animal-page/:id',
        component: AnimalPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
