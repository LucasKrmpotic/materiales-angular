import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, activar: boolean = true): any {

    if (activar) { return value.replace(/\w/g, '*'); }
    return value;

  }
}
