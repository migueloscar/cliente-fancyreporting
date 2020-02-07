import { Informe } from "./Informe";
import { PeriodoValor, ConectorRegistro } from '../generacion-configuracion-model';
import { GeneracionConfiguracionFileService } from './../generacion-configuracion-file.service';
import { String } from 'typescript-string-operations';
import { formatDate } from '@angular/common';

export class UltimosPeriodos extends Informe{
    cadenas={};
    constructor(private service:GeneracionConfiguracionFileService, private locale: string){
        super();
        this.service.castCadenas.subscribe(resultado=>this.cadenas=resultado);
    }

    limpiarFuncionesPlantilla(){
        this.service.limpiarTitulosResCol();
        this.service.limpiarFuncionesParrafosInt();
        this.service.limpiarFuncionesCriteriosParrafos();
        this.service.limpiarParrafosConectores();
        this.service.limpiarFuncionesResCol();
    }

    agregandoTitColRes()
    {
        this.service.addTituloResCol(this.cadenas["tituloFunciones"]);
    }
    
    //funciones parrafos textos
    agregandoIntrosParrafos()
    {
        this.service.addFuncionParrafoIntro(this.iniParIntro);
    }
    
    agregandoCriComentario()
    {
        this.service.addFunParrafoCriterio(this.iniCriEva);
    }
    
    agregandoConector()
    {
        let conector1=new ConectorRegistro();
        conector1.asciendePlural = this.cadenas["asciendePlural"];
        conector1.asciendeSingular = this.cadenas["asciendeSingular"];
        conector1.desciendePlural =  this.cadenas["desciendeSingular"];
        conector1.desciendeSingular =  this.cadenas["desciendePlural"];
        this.service.addParrafosConectores(conector1);
    }
    
    agregandoFuncionesResultado(){
        this.service.addFuncionResCol(this.calcularTotal);
    }

    //introduccion parrafos
    iniParIntro=(periodos)=>
    {
        let intro = this.cadenas["iniParIni"] + " ";
        intro += String.Format(
                this.cadenas["entreFechasFormato1"],
                formatDate(periodos[0],this.cadenas["formatoFecha"],this.locale),
                formatDate(periodos[1],this.cadenas["formatoFecha"],this.locale)
                );
        return intro;
    }
    

    //criterios
    iniCriEva=(listaPeriodosValor)=>
    {
        return this.calcularTotal(listaPeriodosValor) < 0 ? -1 : 1;
    }

    calcularTotal=(listPeriodosValor:PeriodoValor[])=>{
        let datosData=0;
        listPeriodosValor.forEach(x=>{ datosData += x.valor});
        return datosData;
    }

}