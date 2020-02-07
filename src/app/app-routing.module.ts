import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'documentation', loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule) },
  { path: 'sourceCode', loadChildren: () => import('./source-code/source-code.module').then(m => m.SourceCodeModule) },
  { path: 'configurationFile', loadChildren: () => import('./generacion-configuracion-file/generacion-configuracion-file.module').then(m => m.GeneracionConfiguracionFileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
