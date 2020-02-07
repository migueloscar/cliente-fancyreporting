import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { MaterialModule } from './material/material.module';
import { GeneracionConfiguracionFileService } from './generacion-configuracion-file.service';

import { SeleccionDatosComponent, DialogOverviewAyuda } from './seleccion-datos/seleccion-datos.component';
import { FormularioCadenasComponent } from './formulario-cadenas/formulario-cadenas.component';
import { FormularioTablaGruposComponent, DialogOverviewExampleDialog } from './formulario-tabla-grupos/formulario-tabla-grupos.component';
import { PrincipalComponent } from './principal/principal.component';
import { PlantillaTituloGeneralComponent } from './plantilla-titulo-general/plantilla-titulo-general.component';
import { PlantillaTablaComponent } from './plantilla-tabla/plantilla-tabla.component';
import { PlantillaParrafosComponent } from './plantilla-parrafos/plantilla-parrafos.component';
import { PlantillaLineChartComponent } from './plantilla-line-chart/plantilla-line-chart.component';
import { ValoresEditablesComponent , DialogEditVariable } from './valores-editables/valores-editables.component';
import { DescargarArchivoConfiguracionComponent } from './descargar-archivo-configuracion/descargar-archivo-configuracion.component';

import { GeneracionConfiguracionFileRoutingModule } from './generacion-configuracion-file.routing.module';


import { ModEstilosDirective } from './directivas/mod-estilos.directive';

@NgModule({
  declarations: [SeleccionDatosComponent, 
    FormularioCadenasComponent, 
    FormularioTablaGruposComponent, 
    PrincipalComponent,
    DialogOverviewExampleDialog,
    PlantillaTituloGeneralComponent,
    PlantillaTablaComponent,
    PlantillaParrafosComponent,
    PlantillaLineChartComponent,
    ValoresEditablesComponent,
    DialogEditVariable,
    ModEstilosDirective,
    DescargarArchivoConfiguracionComponent,
    DialogOverviewAyuda
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ChartsModule,
    GeneracionConfiguracionFileRoutingModule
  ],
  providers:[
    GeneracionConfiguracionFileService,
    DecimalPipe,
    PercentPipe
  ],
  exports:[
    PrincipalComponent

  ],
  entryComponents: [DialogOverviewExampleDialog,DialogEditVariable,DialogOverviewAyuda]
})
export class GeneracionConfiguracionFileModule { }
