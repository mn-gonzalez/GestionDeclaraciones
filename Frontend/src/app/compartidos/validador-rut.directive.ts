import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function validarRut(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        let value = control.value;
        const valores = [2, 3, 4, 5, 6, 7];
        let verificador_valido = false;
        
        if (!value) {
            return null;
        }

        value = value.replaceAll('.','');
        let rut: number[] =  Array.from(value);
        let verificador = rut.pop();
        let guion = rut.pop();
        let rut_invertido: number[] = rut.reverse();
        let suma = 0;
        let indice = 0;
        let resultado = 0;

        rut_invertido.forEach(digito=>{
            if(indice <= 5){
                let multiplicacion = digito*valores[indice];
                suma = suma + multiplicacion;
                indice++;
            }
            else{
                indice = 0;
                let multiplicacion = digito*valores[indice];
                suma = suma + multiplicacion;
                indice++;
            }
        });

        resultado = suma%11;
        resultado = 11-resultado;

        if(resultado == verificador){
            verificador_valido = true;
        }
        else if(resultado == 10){
            if(verificador?.toString() == "k" || verificador?.toString() == "K"){
                verificador_valido = true;
            }
        } else if(resultado == 11 && verificador == 0){
            verificador_valido = true;
        }

        return !verificador_valido ? {rut_valido:true}: null;
    }
}