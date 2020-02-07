import { Component, OnInit } from '@angular/core';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import {Registro, Grupo} from './../generacion-configuracion-model';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit { 
  registros:Registro[]=[];
  tipoReporte: string=null;

  refrescar:boolean;
  constructor(private service:GeneracionConfiguracionFileService) { 
    this.service.castRegistros.subscribe(resultado=>this.registros=resultado);
    this.service.castTipoReporte.subscribe(resultado=>this.tipoReporte=resultado);
    this.service.castRefrescar.subscribe(resultado=>this.refrescar=resultado);
  }

  ngOnInit() {
  }

  refrescarPlantilla()
  {
    this.service.refrescarPlantilla(!this.refrescar);
  }
}
