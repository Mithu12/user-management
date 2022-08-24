import { NgModule } from  '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  imports: [MatButtonModule,MatToolbarModule,MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSnackBarModule],
  exports: [MatButtonModule,MatToolbarModule,MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSnackBarModule],

})

export  class  AllMaterialModule { }
