import { Component, OnInit, Inject,LOCALE_ID } from '@angular/core';
import { GeneracionConfiguracionFileService } from './../generacion-configuracion-file.service';
import * as XLSX from 'xlsx';
import { RegistroExcel, RegistroConfiguracion, Registro, PeriodoValor, DialogData } from './../generacion-configuracion-model';
import { IVPeriodos } from '../Modules/IVPeriodos';
import {Informe } from './../Modules/Informe';
import {UltimosPeriodos } from './../Modules/UltimosPeriodos';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-seleccion-datos',
  templateUrl: './seleccion-datos.component.html',
  styleUrls: ['./seleccion-datos.component.css']
})
export class SeleccionDatosComponent implements OnInit {
  disabledRadio=true;
  tipoReporte: string=null;
  registrosExcel: RegistroExcel[]=[];
  constructor(private service:GeneracionConfiguracionFileService,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog ) {
  
   }

  ngOnInit() {
    this.service.castTipoReporte.subscribe(resultado=>this.tipoReporte=resultado);
  }

  cambioTipoReporte(){
    this.service.setTipoReporte(this.tipoReporte);
    let reporte=new Informe();
    switch (this.tipoReporte)
    {
    case "IVPeriodos":
      {
        reporte=new IVPeriodos(this.service,this.locale);
      } ;
    break;
    case "UltimosPeriodos":
      {
        reporte=new UltimosPeriodos(this.service,this.locale);
      } ;
    break;
    }
    reporte.limpiarFuncionesPlantilla();
    reporte.agregarFuncionesPlantilla();
    
  }

  onFileChange(ev) {
    this.service.limpiarRegistros();
    this.service.limpiarRegistrosConfiguracion();
    this.service.gruposDefault();
    this.registrosExcel=[];

    let fileInput=document.getElementById("inputGroupFile01");

      let workBook = null;
      let jsonData = null;
      let reader = new FileReader();
      let file = ev.target.files[0];

      //var readRow =
      reader.onload = (event) => {
        let data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' , cellDates: true});
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          let sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        jsonData[Object.keys(jsonData)[0]].map((row)=> {
          let registroExcel: RegistroExcel=new RegistroExcel();
          registroExcel.detalle=row.detalle;
          registroExcel.valor=row.valor;
          registroExcel.periodo=row.periodo;
          this.registrosExcel.push(registroExcel);
        });
      
        //generando periodos y detalles unicos
        this.service.limpiarDetalles();
        this.service.limpiarPeriodo();

        let detalleUnicos: string[]=[];
        let periodosUnicos: Date[]=[];

        this.registrosExcel.forEach(registroExcel=>{
          //detalles unicos
          if(!detalleUnicos.includes(registroExcel.detalle))
          {
            detalleUnicos.push(registroExcel.detalle);
          }

          //periodos unicos
          if(periodosUnicos.length===0)
          {
            periodosUnicos.push(registroExcel.periodo);
          }
          else
          {
            if(periodosUnicos.filter(x=>x.getTime()===registroExcel.periodo.getTime()).length===0)
            {
              periodosUnicos.push(registroExcel.periodo);
            }
          }
          
        });
        periodosUnicos.sort((a,b)=>a.getTime()-b.getTime());
        periodosUnicos.forEach(periodo=>this.service.addPeriodo(periodo));
        detalleUnicos.forEach(detalle=>this.service.addDetalle(detalle));

        //generando registros
        this.service.limpiarRegistros();
        
        detalleUnicos.forEach(detalle=>{
          let registro = new  Registro();
          let registrosSelec = this.registrosExcel.filter(registroExcel => registroExcel.detalle === detalle);
          registro.detalle = detalle;
          registro.listPeriodos=[];
          periodosUnicos.map(periodo => {
            let periodoValor = new PeriodoValor();
            periodoValor.periodo = periodo;
            let registroSeleccionado = registrosSelec.filter(x=>x.periodo.getTime()===periodo.getTime()); 
            periodoValor.valor =  registroSeleccionado.length > 0 ? registroSeleccionado[0].valor : 0  ;
            registro.listPeriodos.push(periodoValor)
          });
          this.service.addRegistro(registro);
        });

        //generando los registros de configuracion
        this.service.limpiarRegistrosConfiguracion();

        detalleUnicos.forEach(detalle=>{
          let confReg = new RegistroConfiguracion();
          confReg.detalle=detalle;
          confReg.grupo=0;
          confReg.orden=0;
          confReg.grafico=true;
          confReg.comentario=true;
          this.service.addRegistrosConfiguracion(confReg);
        });
        

        //asignando los registrosConfiguracion al grupo 0 = default
        this.service.asignarRegistrosConfiguracionGrupoDefault();
        this.disabledRadio=false;
        console.log(this.disabledRadio);
      }
  
      reader.readAsBinaryString(file);

    //colocar estilo exitoso
    fileInput.className="custom-file-input is-valid";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewAyuda, {
      width: '600px',
      data: {name: "hola"}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}

@Component({
  selector: 'ayuda-archivo-excel',
  templateUrl: 'dialog-overview-ayuda-excel.html',
})
export class DialogOverviewAyuda {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewAyuda>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
  }
  descargar(valor){
    let archivo;
    switch(valor){
      case "IVPeriodos":{
        archivo="/assets/excelFiles/DatosIVPeriodosEjemplo.xlsx";
      };
      break;
      case "UltimosPeriodos":{
        archivo="/assets/excelFiles/DatosUltimosPeriodosEjemplo.xlsx";
      };
      break;
    }
    let el = document.getElementById("descargarArchivoEjemplo");
    el.setAttribute("href", archivo);
    el.setAttribute("download", valor+".xlsx");
    el.click();

  }
}