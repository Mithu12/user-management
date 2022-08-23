import { NgModule } from  '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  imports: [MatButtonModule,MatToolbarModule,MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule],
  exports: [MatButtonModule,MatToolbarModule,MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule],

})

export  class  AllMaterialModule { }
