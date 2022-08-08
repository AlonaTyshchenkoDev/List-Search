import { Component, Input } from '@angular/core';

import { IAnimalData } from '../../../interfaces/global.interfaces';

@Component({
  selector: 'app-animal-item',
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.scss']
})
export class AnimalItemComponent {
  @Input() animalData: IAnimalData;
  @Input() isSinglePage: boolean = true;

  get description(): string {
    if (this.isSinglePage) {
      return this.animalData.description;
    }
    return this.animalData.description.slice(0, 150) + '...';
  }
}
