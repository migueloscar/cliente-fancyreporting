import { Component, OnInit } from '@angular/core';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import { Grupo, Registro, RegistrosMostrarTabla, ConectorRegistro, ListGrupoParrafos, GrupoParrafo, RegistroParrafo, RegistroGraficoEstadistico, FormatoNumeros } from '../generacion-configuracion-model';
import { FormularioTablaGruposComponent } from '../formulario-tabla-grupos/formulario-tabla-grupos.component';
import { UtilidadesStrings } from './../UtilidadesStrings';
import { String } from 'typescript-string-operations';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-plantilla-parrafos',
  templateUrl: './plantilla-parrafos.component.html',
  styleUrls: ['./plantilla-parrafos.component.css']
})
export class PlantillaParrafosComponent implements OnInit {
  textos:any={};
  tipoReporte:string;
  grupos:Grupo[];
  registros:Registro[]=[];

  verComentarios:boolean=false;

  listArraysGruposParrafos : ListGrupoParrafos[] = [];

  listFuncionesResCol:any[]=[];
  listTitulosResCol:string[]=[];
  listFunParrafoIntro:any[]=[];
  listFunParrafoCri:any[]=[];
  listParConectores:ConectorRegistro[]=[];

  listPeriodos: Date[]=[];

  pluralizarPalabra=UtilidadesStrings.pluralizarPalabra;

  constructor(private service:GeneracionConfiguracionFileService, private decimalPipe:DecimalPipe, private percentPipe:PercentPipe ) { 
    this.service.castTipoReporte.subscribe(resultado=>this.tipoReporte=resultado);
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
    this.service.castGrupos.subscribe(resultado=>this.grupos=resultado);
    this.service.castPeriodos.subscribe(resultado=>this.listPeriodos=resultado);
    this.service.castRegistros.subscribe(resultado=>this.registros=resultado);

    this.service.castListFuncionesResCol.subscribe(resultado=>this.listFuncionesResCol=resultado);
    this.service.castListFunParrafoIntro.subscribe(resultado=>this.listFunParrafoIntro=resultado);
    this.service.castListFunParrafoCri.subscribe(resultado=>this.listFunParrafoCri=resultado);
    this.service.castListParConectores.subscribe(resultado=>this.listParConectores=resultado);

    this.service.castRefrescar.subscribe(resultado=>{this.ejecutar();});
  }
  ngOnInit(){
    
    this.ejecutar();
  }
  ejecutar(){

    this.listArraysGruposParrafos=[];
    this.verComentarios=false;
    this.grupos.map((grupo,indexGrupo)=>{

      let regConfigReqComentario = grupo.registrosConfiguracion.filter(registroConfiguracion=>registroConfiguracion.comentario===true);
      
      if( regConfigReqComentario.length > 0 )
      { 
        this.verComentarios=true; 
      
        let arrayDetallesComentario = regConfigReqComentario.map(regConfig=>regConfig.detalle);
      
        let registrosComentarios = this.registros.filter(registro=>arrayDetallesComentario.includes(registro.detalle));

        let listGruposParrafos=new ListGrupoParrafos();
        listGruposParrafos.nombre= grupo.nombre;
        listGruposParrafos.orden= indexGrupo;
        for(let i=0; i<this.listFuncionesResCol.length;i++)
        {
          let grupoParrafo=new GrupoParrafo();
          grupoParrafo.orden=i;
          grupoParrafo.nombre=grupo.nombre;
          grupoParrafo.intro=this.listFunParrafoIntro[i](this.listPeriodos);
          grupoParrafo.conector=this.listParConectores[i];
          
          grupoParrafo.registros=registrosComentarios.map((registro,index)=>{
            let registroParrafo=new RegistroParrafo();
            registroParrafo.detalle=registro.detalle;
            registroParrafo.resultado=this.listFuncionesResCol[i](registro.listPeriodos);
            registroParrafo.tendencia=this.listFunParrafoCri[i](registro.listPeriodos);
            registroParrafo.orden=index;

            if(registroParrafo.tendencia<0){
              grupoParrafo.registrosDescienden.push(registroParrafo);
            }
            else{
              grupoParrafo.registrosAscienden.push(registroParrafo);
            }
            return registroParrafo;
          });

          listGruposParrafos.listGruposParrafos.push(grupoParrafo);
        }

        //seleccionando para el grafico estadistico
        let regConfigReqGrafico = grupo.registrosConfiguracion.filter(registroConfiguracion=>registroConfiguracion.grafico===true);
        let arrayDetallesGrafico = regConfigReqGrafico.map(regConfig=>regConfig.detalle);
        let listRegistrosGrafico = this.registros.filter(registro=>arrayDetallesGrafico.includes(registro.detalle));
        
        listRegistrosGrafico.map(registro=>{
          let regGrafico=new RegistroGraficoEstadistico();
          regGrafico.fill=false;
          regGrafico.label=registro.detalle;
          regGrafico.lineTension=0;
          regGrafico.data=registro.listPeriodos.map(periodoValor=>periodoValor.valor);
          listGruposParrafos.registrosGrafico.push(regGrafico);
        });

        let introGrafico = "" 
        
        if (listRegistrosGrafico.length > 1)
        {
          listGruposParrafos.introGrafico = String.Format(this.textos["intGraEstPlural"], this.textos["artPlural"], UtilidadesStrings.pluralizarPalabra(this.textos["dato"]), grupo.nombre); 
        }
        else
        {
          listGruposParrafos.introGrafico = String.Format(this.textos["intGraEstSingular"], this.textos["artSingular"], this.textos["dato"], grupo.nombre);
        }

        this.listArraysGruposParrafos.push(listGruposParrafos);
      }
    });
    
  }

  formatearNumero(numero,formato)
  { 
    let numeroFormateado="";
    
    switch(formato){
      case "#,##0":
        {
          numeroFormateado= this.decimalPipe.transform(numero,'1.0-0');
        }
        break;
        case "#,#.00":
        {
          numeroFormateado= this.decimalPipe.transform(numero,'1.2-2');
        }
        break;
        case "S/ #,#.00":
        {
          numeroFormateado= "S/ "+this.decimalPipe.transform(numero,'1.2-2');
        }
        break;
        case "#,0.00%":
        {
          numeroFormateado= this.percentPipe.transform(numero,'1.2-2');
        }
        break;
        default:{
          numeroFormateado= this.decimalPipe.transform(numero,'1.2-2');
        }
        break;
    }
    return numeroFormateado;
  }
  
}

