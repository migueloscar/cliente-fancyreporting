import { Component, OnInit, Input, Inject,LOCALE_ID } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { RegistroGraficoEstadistico } from '../generacion-configuracion-model';
import {GeneracionConfiguracionFileService} from './../generacion-configuracion-file.service';
import { UtilidadesStrings} from './../UtilidadesStrings';
import { formatDate, PercentPipe, DecimalPipe } from '@angular/common';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-plantilla-line-chart',
  templateUrl: './plantilla-line-chart.component.html',
  styleUrls: ['./plantilla-line-chart.component.css']
})
export class PlantillaLineChartComponent implements OnInit {
  @Input() listRegistrosGraficoEstadistico:RegistroGraficoEstadistico[];
  
  textos:string[]=[];
  listPeriodos: Date[]=[];
  listDetallesGrafico: string[]=[];

  lineChartData: ChartDataSets[] =[];
  lineChartLabels: Label[]=[];
  lineChartOptions: (ChartOptions)={};
  lineChartType:string="";

  constructor(private service:GeneracionConfiguracionFileService,
    @Inject(LOCALE_ID) private locale: string,
    private decimalPipe:DecimalPipe, 
    private percentPipe:PercentPipe) { 
    this.service.castCadenas.subscribe(resultado=>this.textos=resultado);
    this.service.castPeriodos.subscribe(resultado=>this.listPeriodos=resultado);

  }
  
  ngOnInit(){

    let that=this;

    this.listDetallesGrafico=this.listRegistrosGraficoEstadistico.map(registro=>registro.label);
    let listChartLabels = this.listPeriodos.map(periodo=>formatDate(periodo,this.textos["formtGraficoPer"],this.locale));

    let titulo=this.formarTitulo();

    this.lineChartData= this.listRegistrosGraficoEstadistico;
    this.lineChartLabels = listChartLabels;
    this.lineChartOptions = {
      responsive: true,
      legend: {
          display: true,
          position: 'right',
          align:'center',
          labels: {
          boxWidth: 20,
          fontColor: 'black'
          }
      },
      title:{
        display: true,
        text: this.formarTitulo()
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{}],
        yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: this.textos["graficoEjeY"]
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
                return that.formatearNumero(value,that.textos["formatoNumGrafico"]);
            }
          }
        }]
      },
    };
    this.lineChartType = 'line';
  }

  formarTitulo(){
    
    let detallesRegistros="";

    if (this.listRegistrosGraficoEstadistico.length > 1)
    {
      detallesRegistros = this.listDetallesGrafico.slice(0,-1).join(", ")+" "+this.textos["ultimoConector"]+" "+this.listDetallesGrafico.slice(-1).join();
    }
    else
    {
      detallesRegistros = this.listDetallesGrafico.slice(-1).join();
    }
    
    let titulo= this.textos["inicioTitGraEst"];
    titulo += (this.listRegistrosGraficoEstadistico.length > 1 ? this.textos["artPlural"] : this.textos["artSingular"]) + " ";
    titulo += (this.listRegistrosGraficoEstadistico.length > 1 ? UtilidadesStrings.pluralizarPalabra(this.textos["dato"]) : this.textos["dato"] ) + " ";
    titulo += detallesRegistros + " ";
    titulo += String.Format(this.textos["entreFechasFormato3"],
    formatDate(this.listPeriodos[0],this.textos["formatoFecha"],this.locale),
    formatDate(this.listPeriodos[this.listPeriodos.length-1],this.textos["formatoFecha"],this.locale));
    titulo=titulo.toUpperCase();
    return titulo;
  }
  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
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
