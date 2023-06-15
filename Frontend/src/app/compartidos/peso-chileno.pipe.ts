import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pesochileno'})
export class PesoChilenoPipe implements PipeTransform {
  transform(moneda: number): string {
    let resultado: string[] = [];
    let digitos = Array.from(moneda.toString());
    digitos.reverse();
    let size = digitos.length;
    let contador = 0;

    digitos.forEach(digito =>{
        if(contador == 3){
            resultado.push(".");
            contador = 0;
        }
        resultado.push(digito);
        contador++;
    });

    resultado.reverse();
    let digito_miles = resultado.join("");

    return digito_miles.toString();
  }
}