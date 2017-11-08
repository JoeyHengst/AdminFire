import { SharedModule } from './../../../../../client/src/app/shared/shared.module';
import { RecordsRoutingModule } from './records-routing.module';
import { RecordsTrashComponent } from './records-trash/records-trash.component';
import { RecordsComponent } from './records.component';
import { RecordsListComponent } from './records-list/records-list.component';
import { RecordsContainerComponent } from './records-container/records-container.component';
import { RecordsArchiveComponent } from './records-archive/records-archive.component';
import { RecordRowComponent } from './record-row/record-row.component';
import { RecordFormComponent } from './record-form/record-form.component';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { LoadingSpinnerComponent } from './../../pages/components/loading-spinner/loading-spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { recordReducer } from './records.reducer';
import { RecordsEffects } from './records.effects'

const components = [
    RecordFormComponent,
    RecordRowComponent,
    RecordsArchiveComponent,
    RecordsContainerComponent,
    RecordsListComponent,
    RecordsComponent,
    RecordsTrashComponent
];

@NgModule({
    imports: [
        ThemeModule, FormsModule, ReactiveFormsModule, RecordsRoutingModule, SharedModule
        , StoreModule.forFeature('record', recordReducer),
        EffectsModule.forFeature([RecordsEffects])
    ],
    declarations: [
        ...components,
    ]
})
export class RecordsModule { }
