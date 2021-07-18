import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenesPipe implements PipeTransform {

  transform(heroe: Heroe): String {
    return `assets/heroes/${heroe.id}.jpg`
  }

}
