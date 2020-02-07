
export class RegistroExcel
{
    detalle : string;
    periodo : Date;
    valor : number;
}

export class Registro
{
    detalle : string;
    listPeriodos: PeriodoValor[];
}

export class PeriodoValor
{
    periodo:Date;
    valor: number;
}

export class Grupo
{
    id: number;
    nombre: string;
    registrosConfiguracion:RegistroConfiguracion[];
    registros:Registro[];
}

export class RegistroConfiguracion{
    detalle: string;
    orden: number;
    comentario: boolean;
    grafico: boolean;
    grupo: number;
}

export class ConectorRegistro{

    asciendeSingular:string;
    asciendePlural:string;
    desciendeSingular:string;
    desciendePlural:string;

}

//modelos para plantillas
export class FormatoObjetos{
    viewValue: string;
    value:string;
}

export class RegistrosMostrarTabla {
    detalle: string;
    listaPeriodosValores: PeriodoValor[];
    tipo: string; 
}

export class GrupoParrafo{
  registros:RegistroParrafo[]=[];
  registrosAscienden:RegistroParrafo[]=[];
  registrosDescienden:RegistroParrafo[]=[];
  nombre:string="";
  intro:string="";
  conector:ConectorRegistro;
  orden:number=0;
}

export class ListGrupoParrafos{
 nombre : string="";
 listGruposParrafos:GrupoParrafo[]=[];
 registrosGrafico:RegistroGraficoEstadistico[]=[];
 introGrafico: string="";
 orden:number=0;
}

export class RegistroParrafo{
  detalle:string="";
  tendencia:number=0;
  resultado:number=0;
  orden:number=0;
}

export class RegistroGraficoEstadistico
{
  label: string;
  data: number[]=[];
  lineTension: number;
  fill: boolean;
  //borderColor: string;
}

export interface DialogData {
  nombre: string;
  valor: string;
}

export class FormatoNumeros{
  formatoTablaValoresPeriodos:string="";
  formatoTablaResultados:string="";
  formatoParrafoResultados:string="";
  formatoGraficoEstadistico:string="";
}