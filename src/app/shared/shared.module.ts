import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnimalItemComponent } from './components/animal-item/animal-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AnimalItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AnimalItemComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class SharedModule { }
