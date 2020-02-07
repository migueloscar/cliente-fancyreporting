import { Injectable} from '@angular/core';
import { Registro, Grupo, RegistroConfiguracion, ConectorRegistro, FormatoNumeros} from './generacion-configuracion-model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Constantes } from './Constantes';

@Injectable({
  providedIn: 'root'
})
export class GeneracionConfiguracionFileService {
  private tipoReporte=new BehaviorSubject<string>(null);
  private cadenas=new BehaviorSubject<any>({});
  private grupos=new BehaviorSubject<Grupo[]>([]);

  private resfrescar=new BehaviorSubject<boolean>(true);

  private registros=new BehaviorSubject<Registro[]>([]); 
  private registroConfiguracion=new BehaviorSubject<RegistroConfiguracion[]>([]);
   
  private periodosUnicos=new BehaviorSubject<Date[]>([]); 
  private detallesUnicos=new BehaviorSubject<String[]>([]); 
  
  private listFuncionesResCol=new BehaviorSubject<any[]>([]);
  private listTitulosResCol=new BehaviorSubject<string[]>([]);
  private listFunParrafoIntro=new BehaviorSubject<any[]>([]);
  private listFunParrafoCri=new BehaviorSubject<any[]>([]);
  private listParConectores=new BehaviorSubject<ConectorRegistro[]>([]);

  castTipoReporte=this.tipoReporte.asObservable();
  castCadenas=this.cadenas.asObservable();
  castGrupos=this.grupos.asObservable();

  castRegistros=this.registros.asObservable();
  castRegistrosConfiguracion=this.registroConfiguracion.asObservable();
  
  castPeriodos=this.periodosUnicos.asObservable();
  castDetallesUnicos=this.detallesUnicos.asObservable();

  castListFuncionesResCol=this.listFuncionesResCol.asObservable();
  castListTitulosResCol=this.listTitulosResCol.asObservable();
  castListFunParrafoIntro=this.listFunParrafoIntro.asObservable();
  castListFunParrafoCri=this.listFunParrafoCri.asObservable();
  castListParConectores=this.listParConectores.asObservable();

  castRefrescar = this.resfrescar.asObservable();


 
  constructor() {

    let grupoDefault=new Grupo();
    grupoDefault.id=0;
    grupoDefault.nombre="Nuevo";
    grupoDefault.registros=[];
    this.grupos.next([grupoDefault]);
    this.cadenas.next([Constantes.cadenas["IVPeriodos"]]);
   }



  //refrescar plantilla
   refrescarPlantilla(estado){
      this.resfrescar.next(estado);
   }

  //funciones resultado columnas
   addFuncionResCol(funcion:any){
    this.listFuncionesResCol.next(this.listFuncionesResCol.getValue().concat(funcion));
  } 
  limpiarFuncionesResCol(){
    this.listFuncionesResCol.next([]);
  }

  //array titulos resultados columnas
  addTituloResCol(titulo:string){
    this.listTitulosResCol.next(this.listTitulosResCol.getValue().concat(titulo));
  } 
  limpiarTitulosResCol(){
    this.listTitulosResCol.next([]);
  }

  //funciones parrafos intros
  addFuncionParrafoIntro(funcion:any){
    this.listFunParrafoIntro.next(this.listFunParrafoIntro.getValue().concat(funcion));
  } 

  limpiarFuncionesParrafosInt(){
    this.listFunParrafoIntro.next([]);
  }

  //funciones parrafos criterio
  addFunParrafoCriterio(funcion:any){
    this.listFunParrafoCri.next(this.listFunParrafoCri.getValue().concat(funcion));
  } 

  limpiarFuncionesCriteriosParrafos(){
    this.listFunParrafoCri.next([]);
  }

  //array conectores
  addParrafosConectores(conectorRegistro:ConectorRegistro){
    this.listParConectores.next(this.listParConectores.getValue().concat(conectorRegistro));
  } 
  limpiarParrafosConectores(){
    this.listParConectores.next([]);
  } 

  //lista de detalles unicos
  addDetalle(detalle){
    this.detallesUnicos.next(this.detallesUnicos.getValue().concat(detalle));
  }

  limpiarDetalles()
  {
    this.detallesUnicos.next([]);
  }
  //lista periodos unicos
  addPeriodo(periodo){
    this.periodosUnicos.next(this.periodosUnicos.getValue().concat(periodo));
  }
  limpiarPeriodo(){
    this.periodosUnicos.next([]);
  }

  //lista registro configuracion
  addRegistrosConfiguracion(config: RegistroConfiguracion):void{
    this.registroConfiguracion.next(this.registroConfiguracion.getValue().concat([config]));
  }

  limpiarRegistrosConfiguracion():void{
    this.registroConfiguracion.next([]);
  }

  //asignando tipo de reporte
  setTipoReporte(tipo){
    this.tipoReporte.next(tipo);
    this.cadenas.next(Constantes.cadenas[tipo]);
  }

  //lista de registros
  addRegistro(registro: Registro):void{
    this.registros.next(this.registros.getValue().concat([registro]));
  }

  limpiarRegistros(){
    this.registros.next([]);
  }

  //lista grupos
  addGrupo(grupo: Grupo):void{
    this.grupos.next(this.grupos.getValue().concat([grupo]));
  }

  limpiarGrupo(){
    let grupoDefault=new Grupo();
    grupoDefault.id=0;
    grupoDefault.nombre="Nuevo";
    grupoDefault.registros=[];
    
    this.grupos.next([grupoDefault]);
  }

  nuevoGrupo():Grupo{
    return {
      id:this.grupos.value.length,
      nombre:'',
      registros:[],
      registrosConfiguracion:[]
    }
  }

  gruposDefault():void
  {
    let grupoDefault=new Grupo();
    grupoDefault.id=0;
    grupoDefault.nombre="Nuevo";
    grupoDefault.registros=[];
    grupoDefault.registrosConfiguracion=[];

    this.grupos.next([grupoDefault]);
  }

  asignarRegistrosConfiguracionGrupoDefault()
  {
    this.grupos.value[0].registrosConfiguracion=this.registroConfiguracion.value;
  }


}

