import { LoadingSpinnerComponent } from './loading-spinner.component';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [LoadingSpinnerComponent],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerModule { }