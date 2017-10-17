import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesContainerComponent } from './notes-container/notes-container.component';

const routes: Routes = [{
  path: '',
  component: NotesContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule { }
