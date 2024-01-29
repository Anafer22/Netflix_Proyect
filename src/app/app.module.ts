import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Configuracion del locale de la app
import localeESMX from  '@angular/common/locales/es-MX';
import localeFRCA from  '@angular/common/locales/fr-CA';
import { registerLocaleData} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

registerLocaleData( localeESMX );
registerLocaleData( localeFRCA );

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,

    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-MX',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
