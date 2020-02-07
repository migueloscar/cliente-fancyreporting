import { Component, OnInit, Inject } from '@angular/core';

import { GeneracionConfiguracionFileService } from './../generacion-configuracion-file.service';
import { Registro, RegistroConfiguracion, Grupo, DialogData } from './../generacion-configuracion-model';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-tabla-grupos',
  templateUrl: './formulario-tabla-grupos.component.html',
  styleUrls: ['./formulario-tabla-grupos.component.css']
})
export class FormularioTablaGruposComponent implements OnInit {
  registros : Registro[] = [];
  reg : string[] = [];
  registrosConfiguracion : RegistroConfiguracion[] = [];
  grupos : Grupo[] = [];
  constructor(private service:GeneracionConfiguracionFileService,public dialog: MatDialog) { 
    this.service.castRegistros.subscribe(resultado=>this.registros=resultado);
    this.service.castRegistrosConfiguracion.subscribe(resultado=>this.registrosConfiguracion=resultado);
    this.service.castGrupos.subscribe(resultado=>this.grupos=resultado);
  }

  
  ngOnInit() {

  }

  nombre:string="";
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.nombre}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(typeof result !== 'undefined')
      {
        let nuevoGrupo=this.service.nuevoGrupo();
        nuevoGrupo.nombre=result;
        this.service.addGrupo(nuevoGrupo);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

@Component({
  selector: 'dialog-new-group',
  templateUrl: 'dialog-new-group.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

