import { Informe } from "./Informe";
import { PeriodoValor, ConectorRegistro } from '../generacion-configuracion-model';
import { GeneracionConfiguracionFileService } from './../generacion-configuracion-file.service';
import { String } from 'typescript-string-operations';
import { formatDate } from '@angular/common';

export class IVPeriodos extends Informe{
    cadenas={};
    periodos=[];
    constructor(private service:GeneracionConfiguracionFileService, private locale: string){
        super();
        this.service.castCadenas.subscribe(resultado=>this.cadenas=resultado);
        this.service.castPeriodos.subscribe(resultado=>this.periodos=resultado);
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
        this.service.addTituloResCol(
            String.Format(
                "{0} / {1}", 
                formatDate(this.periodos[0],this.cadenas["formatoFecha"],this.locale), 
                formatDate(this.periodos[1],this.cadenas["formatoFecha"],this.locale)
            )
            );
        this.service.addTituloResCol(
            String.Format(
                "{0} / {1}", 
                formatDate(this.periodos[2],this.cadenas["formatoFecha"],this.locale), 
                formatDate(this.periodos[3],this.cadenas["formatoFecha"],this.locale)
                )
            );
        this.service.addTituloResCol(this.cadenas["evolucionFinal"]);
            
    }
    
    //funciones parrafos textos
    agregandoIntrosParrafos()
    {
        this.service.addFuncionParrafoIntro(this.iniParIntro);
        this.service.addFuncionParrafoIntro(this.medioParIntro);
        this.service.addFuncionParrafoIntro(this.finalParIntro);
    }
    
    agregandoCriComentario()
    {
        this.service.addFunParrafoCriterio(this.iniCriEva);
        this.service.addFunParrafoCriterio(this.midCriEva);
        this.service.addFunParrafoCriterio(this.finCriEva);
    }
    
    agregandoConector()
    {
        let conector1=new ConectorRegistro();
        conector1.asciendePlural = this.cadenas["asciendePlural"];
        conector1.asciendeSingular = this.cadenas["asciendeSingular"];
        conector1.desciendePlural =  this.cadenas["desciendeSingular"];
        conector1.desciendeSingular =  this.cadenas["desciendePlural"];
        
        let conector2=new ConectorRegistro();
        conector2.asciendePlural    = this.cadenas["asciendePlural"];
        conector2.asciendeSingular  = this.cadenas["asciendeSingular"];
        conector2.desciendePlural   =  this.cadenas["desciendeSingular"];
        conector2.desciendeSingular =  this.cadenas["desciendePlural"];

        let conector3=new ConectorRegistro();
        conector2.asciendePlural    = this.cadenas["tenFinAsciendeSingular"]; 
        conector2.asciendeSingular  = this.cadenas["tenFinAsciendePlural"];
        conector2.desciendePlural   = this.cadenas["tenFinDesciendeSingular"];
        conector2.desciendeSingular = this.cadenas["tenFinDesciendePlural"];

        this.service.addParrafosConectores( conector1);
        this.service.addParrafosConectores( conector2);
        this.service.addParrafosConectores( conector3);
    }
    
    agregandoFuncionesResultado(){
        this.service.addFuncionResCol(this.calcularPeriodoI);
        this.service.addFuncionResCol(this.calcularPeriodoII);
        this.service.addFuncionResCol(this.calculoFinal);
    }

    //introduccion parrafos
    iniParIntro=(periodos:Date[])=>
    {
        let intro = this.cadenas["iniParIni"] + " ";
        intro += String.Format(
                this.cadenas["entreFechasFormato1"],
                formatDate(periodos[0],this.cadenas["formatoFecha"],this.locale),
                formatDate(periodos[1],this.cadenas["formatoFecha"],this.locale)
                );
        return intro;
    }
    medioParIntro=(periodos:Date[])=>
        {
            let intro = this.cadenas["iniParMed"] + " ";
            intro += String.Format(
                    this.cadenas["entreFechasFormato1"],
                    formatDate(periodos[2],this.cadenas["formatoFecha"],this.locale),
                    formatDate(periodos[3],this.cadenas["formatoFecha"],this.locale)
                    );
            return intro;
        }
    finalParIntro=(periodos:Date[])=>
        {
            let intro = this.cadenas["iniParConFinal"] + " ";
            intro += String.Format(
                    this.cadenas["parrafoResultado"],
                    formatDate(periodos[1],"yyyy",this.locale),
                    formatDate(periodos[1],this.cadenas["formatoFecha"],this.locale),
                    formatDate(periodos[3],"yyyy",this.locale),
                    formatDate(periodos[3],this.cadenas["formatoFecha"],this.locale),
                    );
            return intro;
        }
    //criterios
    iniCriEva = (listaPeriodosVal:PeriodoValor[])=>
    {
        return this.calcularPeriodoI(listaPeriodosVal) < 0 ? -1 : 1;
    }

    midCriEva = (listaPeriodosVal:PeriodoValor[])=>
    {
        return this.calcularPeriodoII(listaPeriodosVal) < 0 ? -1 : 1;
    }

    finCriEva = (listaPeriodosVal:PeriodoValor[])=>
    {
        return this.calculoFinal(listaPeriodosVal) < 0 ? -1 : 1;
    }
    //funciones columnass resultados
    calcularPeriodoI = (listaPeriodosVal:PeriodoValor[])=>
    {
        if (listaPeriodosVal[0].valor != 0)
        {
            return (listaPeriodosVal[1].valor - listaPeriodosVal[0].valor) / listaPeriodosVal[0].valor;
        }
        else
        {
            return 0;
        }
    }
    calcularPeriodoII = (listaPeriodosVal:PeriodoValor[])=>
    {
        if (listaPeriodosVal[0].valor != 0)
        {
            return (listaPeriodosVal[3].valor - listaPeriodosVal[2].valor) / listaPeriodosVal[2].valor;
        }
        else
        {
            return 0;
        }
        
    }

    calculoFinal = (listaPeriodosVal:PeriodoValor[])=>
    {
        return - this.calcularPeriodoI(listaPeriodosVal) + this.calcularPeriodoII(listaPeriodosVal);
    }

}

