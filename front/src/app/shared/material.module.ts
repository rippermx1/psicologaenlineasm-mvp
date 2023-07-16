import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatRadioModule
  ],
  exports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatRadioModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class MaterialModule { }
