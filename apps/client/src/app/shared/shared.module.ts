import { LoadingSpinnerComponent } from './../pages/components/loading-spinner/loading-spinner.component';
import { AuthBlockComponent } from './../session/auth-block/auth-block.component';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [AuthBlockComponent, LoadingSpinnerComponent],   
    exports: [AuthBlockComponent, LoadingSpinnerComponent]
})
export class SharedModule {
}
