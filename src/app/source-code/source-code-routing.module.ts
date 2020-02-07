import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourceCodeComponent } from './source-code.component';

const routes: Routes = [{ path: '', component: SourceCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceCodeRoutingModule { }
