import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
