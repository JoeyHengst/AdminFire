import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesContainerComponent } from './notes-container/notes-container.component';
import { NotesArchiveComponent } from './note-archive/note-archive.component';
import { NotesTrashComponent } from './note-trash/note-trash.component';
import { NotesComponent } from './notes.component';

const routes: Routes = [{
  path: '',
  component: NotesComponent,
  children: [{
    path: 'personal',
    component: NotesContainerComponent
  },{
    path: 'specific',
    component: NotesContainerComponent
  },{
    path: 'archive',
    component: NotesArchiveComponent
  },{
    path: 'trash',
    component: NotesTrashComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule { }
