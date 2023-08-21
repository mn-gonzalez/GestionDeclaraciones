import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'utm'})
export class UtmPipe implements PipeTransform {
  transform(utm: number): string {
    let resultado: string;
    resultado = utm.toString().replace(".", ",");

    return resultado;
  }
}