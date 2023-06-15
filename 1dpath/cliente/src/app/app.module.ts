import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './core/shared/shared.module';
import { MaterialModule } from './core/shared/material/material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster'


//import { HighchartsChartModule }  from './1dpath/cliente/node_modules/highcharts-angular';
//import { PublicComponent } from './public/public.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MaterialModule,
    LeafletMarkerClusterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

