import { Inject,LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

export class UtilidadesStrings{
    static pluralizarPalabra=(cadena:string):string=>{
        let regex=RegExp("([aeiou])$");
        return regex.test(cadena)?cadena+"s":cadena+"es";
    }
}