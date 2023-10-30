import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListComponent } from './components/list/list.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { StatusPipe } from './pipes/status.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    FormularioComponent,
    StatusPipe
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    MaterialModule,
  
  ]
})
export class EntradasModule { }
