import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NumericOnlyDirective } from './directives/numeric-only.directive';
import { RutDirective } from './directives/rut.direvtive';
import { RutPipe } from './pipes/rut.pipe';
import { RutValidator } from './validators/rut.validator';

@NgModule({
  declarations: [NumericOnlyDirective, RutDirective, RutPipe, RutValidator],
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule, NumericOnlyDirective, RutDirective, RutPipe, RutValidator],
})
export class SharedModule {}
