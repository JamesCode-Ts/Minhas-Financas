import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './commom/componentes/toolbar/toolbar.component';
import { MaterialModule } from './shared/material/material.module';
/** Para configurar Data no formato pt-BR */
import {LOCALE_ID} from "@angular/core";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from '@angular/common';
import { AuthGuard } from './commom/auth.guard';
import { AuthInterceptor } from './commom/auth.interceptor';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
