import { Component, OnInit,Output, Input,EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'changeValue',
  templateUrl: './valores-editables.component.html',
  styleUrls: ['./valores-editables.component.css']
})
export class ValoresEditablesComponent implements OnInit {
  @Input() cadena: string;
  @Input() valueView: string;
  @Output() cadenaChange =new EventEmitter();
  @Output() recargarValueView=new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditVariable, {
      width: '250px',
      data: {name: this.cadena}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(typeof result !== 'undefined')
      {
        this.cadenaChange.emit(result);
        this.recargarValueView.emit();
      }    
    });
  }
}

@Component({
  selector: 'dialog-new-group',
  templateUrl: 'dialog-view-editing-variable.html',
})
export class DialogEditVariable {

  constructor(
    public dialogRef: MatDialogRef<DialogEditVariable>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  name: string;
  valor: string;
}
