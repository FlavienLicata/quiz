import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LineChartComponent } from "./line-chart/line-chart.component";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HorizontalBarComponent } from "./horizontal-bar-chart/horizontal-bar-chart.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button"; // If You need animations

@NgModule({
  declarations: [
    LineChartComponent,
    HorizontalBarComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [
    LineChartComponent,
    HorizontalBarComponent
  ],
  bootstrap: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CommonComponentsModule { }
