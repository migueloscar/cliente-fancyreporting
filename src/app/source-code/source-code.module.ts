import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceCodeRoutingModule } from './source-code-routing.module';
import { SourceCodeComponent } from './source-code.component';


@NgModule({
  declarations: [SourceCodeComponent],
  imports: [
    CommonModule,
    SourceCodeRoutingModule
  ]
})
export class SourceCodeModule { }
