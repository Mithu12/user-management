import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AllMaterialModule} from "./material.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule, ReactiveFormsModule, BrowserAnimationsModule, AllMaterialModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
