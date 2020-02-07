import { NgModule } from '@angular/core';
import { MatRadioModule, MatButtonModule, MatInputModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

const MaterialComponent=[
  MatButtonModule,
  MatRadioModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  DragDropModule,
  MatCheckboxModule,
  MatListModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule
];


@NgModule({
  declarations: [],
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }
