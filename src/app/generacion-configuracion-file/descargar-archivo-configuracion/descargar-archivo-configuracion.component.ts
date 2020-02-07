import { Component, OnInit } from '@angular/core';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import { Grupo } from './../generacion-configuracion-model';

@Component({
  selector: 'app-descargar-archivo-configuracion',
  templateUrl: './descargar-archivo-configuracion.component.html',
  styleUrls: ['./descargar-archivo-configuracion.component.css']
})
export class DescargarArchivoConfiguracionComponent implements OnInit {
  textos:{};
  grupos: Grupo[];
  constructor(private service:GeneracionConfiguracionFileService) { 
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
    this.service.castGrupos.subscribe(resultado=>this.grupos=resultado);
  }

  ngOnInit() {
  }

  descargar(){
    let objExportar=new Object();

    let gruposExportar= [];
    let registrosConfiguracionExportar= [];
    this.grupos.map((datoGrupo)=>{
      
      let grupo=new Object();
      grupo["grupo"]=datoGrupo.id;
      grupo["descripcion"]=datoGrupo.nombre;
      gruposExportar.push(grupo);

      datoGrupo.registrosConfiguracion.map((regConfiguracion,iReg)=>{
        let reg=new Object();
        reg["orden"]=iReg;
        reg["detalle"]=regConfiguracion.detalle;
        reg["grupo"]=datoGrupo.id;
        reg["comentario"]=regConfiguracion.comentario;
        reg["graficoEstadistico"]=regConfiguracion.grafico;
        registrosConfiguracionExportar.push(reg);

      });
      
    });

    objExportar["cadenas"]=this.textos;
    objExportar["grupos"]=gruposExportar;
    objExportar["datos"]=registrosConfiguracionExportar;
    let dataString = JSON.stringify(objExportar);
    let el = document.getElementById("download");
    el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(dataString)}`);
    el.setAttribute("download", 'configuracion.json');
    el.click();
  }

}
