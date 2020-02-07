import { Component, OnInit } from '@angular/core';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import {FormatoObjetos, FormatoNumeros} from './../generacion-configuracion-model';
@Component({
  selector: 'app-formulario-cadenas',
  templateUrl: './formulario-cadenas.component.html',
  styleUrls: ['./formulario-cadenas.component.css']
})
export class FormularioCadenasComponent implements OnInit {
  textos:string[]=[];
  
  
  formatosFecha: FormatoObjetos[] = [
    {value: 'dd-MM-yyyy', viewValue: 'dd-MM-yyyy   (21-10-2019)'},
    {value: 'dd/MM/yyyy', viewValue: 'dd/MM/yyyy   (21/10/2019)'},
    {value: 'dd.MM.yyyy', viewValue: 'dd.MM.yyyy   (21.10.2019)'}
  ];

  formatosNumeros: FormatoObjetos[] = [
    {value: "#,0.00%", viewValue: 'Porcentaje #,#%'},
    {value: "#,#.00" , viewValue: 'Numero #.#'},
    {value: "S/ #,#.00" , viewValue: 'Moneda S/ #.#'},
    {value: "#,##0" , viewValue: 'Enteros #,0'}
  ];
  
  constructor(private service:GeneracionConfiguracionFileService) { 
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
  }

  ngOnInit() {
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
  }  

}
