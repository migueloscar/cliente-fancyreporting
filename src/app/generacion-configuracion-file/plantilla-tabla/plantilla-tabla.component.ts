import { Component, OnInit, Inject,LOCALE_ID, Input } from '@angular/core';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import {Registro,Grupo, PeriodoValor, RegistrosMostrarTabla} from './../generacion-configuracion-model';
import { UtilidadesStrings } from './../UtilidadesStrings';
import { formatDate, formatNumber, getLocaleFirstDayOfWeek, DecimalPipe, PercentPipe } from '@angular/common';
import { DataSource } from '@angular/cdk/table';
import { ResourceLoader, removeSummaryDuplicates } from '@angular/compiler';


@Component({
  selector: 'app-plantilla-tabla',
  templateUrl: './plantilla-tabla.component.html',
  styleUrls: ['./plantilla-tabla.component.css']
})
export class PlantillaTablaComponent implements OnInit {
  textos:any="";
  grupos:Grupo[]=[];
  listFuncionesResCol:any[]=[];
  listTitulosResCol: string[]=[];
  listRegistros: Registro[]=[];
  listPeriodos: Date[]=[];

  registrosMostrar:RegistrosMostrarTabla[]=[];

  constructor(private service:GeneracionConfiguracionFileService,
    @Inject(LOCALE_ID) private locale: string,
    private decimalPipe:DecimalPipe, 
    private percentPipe:PercentPipe) { 
 
  }

  ngOnInit() {
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
    this.service.castGrupos.subscribe(resultado=>this.grupos=resultado);
    this.service.castPeriodos.subscribe(resultado=>this.listPeriodos=resultado);
    this.service.castRegistros.subscribe(resultado=>this.listRegistros=resultado);
    
    this.service.castListFuncionesResCol.subscribe(resultado=>this.listFuncionesResCol=resultado)
    this.service.castListTitulosResCol.subscribe(resultado=>this.listTitulosResCol=resultado)
    

    this.service.castRefrescar.subscribe(resultado=>{this.ejecutarTabla();});
    
    
  }

  ejecutarTabla()
  {
    this.registrosMostrar=[]; 
      this.grupos.map((grupo)=>
      {
        let registroMostrar=new RegistrosMostrarTabla();
        registroMostrar.detalle=grupo.nombre;
        registroMostrar.tipo="grupo"
        this.registrosMostrar.push(registroMostrar);

        grupo.registrosConfiguracion.map(registroConfiguracion=>{
          let registroMostrar=new RegistrosMostrarTabla();
          registroMostrar.detalle=registroConfiguracion.detalle;
          registroMostrar.tipo="registro"
          
          registroMostrar.listaPeriodosValores=this.listRegistros.filter(x=>x.detalle===registroConfiguracion.detalle)[0].listPeriodos;
          
          this.registrosMostrar.push(registroMostrar);
        });
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




