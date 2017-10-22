import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsTrashComponent } from './records-trash/records-trash.component';
import { RecordsArchiveComponent } from './records-archive/records-archive.component';
import { RecordsContainerComponent } from './records-container/records-container.component';
import { RecordsComponent } from './records.component';
import { RecordFormComponent } from './record-form/record-form.component';

const routes: Routes = [{
  path: '',
  component: RecordsComponent,
  children: [{
    path: 'create',
    component: RecordFormComponent
  },{
    path: 'line',
    component: RecordsContainerComponent,
  },{
    path: 'staff',
    component: RecordsContainerComponent
  },{
    path: 'archive',
    component: RecordsArchiveComponent
  },{
    path: 'trash',
    component: RecordsTrashComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule { }
