import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListComponent } from './components/list/list.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    ListComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    MaterialModule
  ]
})
export class EntradasModule { }
