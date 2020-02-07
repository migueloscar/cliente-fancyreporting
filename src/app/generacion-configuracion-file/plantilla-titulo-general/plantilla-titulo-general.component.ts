import { Component, OnInit, Inject,LOCALE_ID } from '@angular/core';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import { String } from 'typescript-string-operations';
import { formatDate } from '@angular/common';
import { UtilidadesStrings } from './../UtilidadesStrings';

@Component({
  selector: 'app-plantilla-titulo-general',
  templateUrl: './plantilla-titulo-general.component.html',
  styleUrls: ['./plantilla-titulo-general.component.css']
})
export class PlantillaTituloGeneralComponent implements OnInit {
  listPeriodos: Date[]=[];
  textos:any={};
  refrescar:boolean;
  constructor(private service:GeneracionConfiguracionFileService,@Inject(LOCALE_ID) private locale: string) { 
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
    this.service.castPeriodos.subscribe(resultado=>this.listPeriodos=resultado);
    this.service.castRefrescar.subscribe(resultado=>this.refrescar=resultado);
  }

  formatoFechas :string;

  datoView:string;
  entreFechasView:string;

  ngOnInit() {
    this.service.castRefrescar.subscribe( resultado=>{this.recargarValores()});
      this.recargarValores();
    }
  recargarValores(){
    this.formatoFechas = this.textos["formatoFecha"];
    this.datoView=UtilidadesStrings.pluralizarPalabra(this.textos["dato"]);
    this.entreFechasView = String.Format(this.textos["entreFechasFormato3"],
                        formatDate(this.listPeriodos[0],this.formatoFechas,this.locale),
                        formatDate(this.listPeriodos[this.listPeriodos.length-1],this.formatoFechas,this.locale));
  }

}
