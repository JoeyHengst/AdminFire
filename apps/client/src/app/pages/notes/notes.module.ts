import { LoadingSpinnerModule } from './../components/loading-spinner/loading-spinner.module';
import { NotesTrashComponent } from './note-trash/note-trash.component';
import { NotesComponent } from './notes.component';
import { NotesArchiveComponent } from './note-archive/note-archive.component';
import { NoteToolbarComponent } from './note-toolbar/note-toolbar.component';
import { NoteLabelComponent } from './note-label/note-label.component';
import { NoteRowComponent } from './note-row/note-row.component';
import { NotesContainerComponent } from './notes-container/notes-container.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteCreator } from './note-form/note-form.component';
import { ColorPicker } from './color-picker/color-picker.component';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NotesRoutingModule } from './notes-routing.module';
import { SearchModule } from './../../pages/components/search/search.module';
import { LoadingSpinnerComponent } from './../../pages/components/loading-spinner/loading-spinner.component';

const components = [
    NoteLabelComponent,
    NoteRowComponent,
    NoteToolbarComponent,
    NotesContainerComponent,
    NotesListComponent,
    NoteCreator,
    NotesArchiveComponent,
    NotesTrashComponent,
    NotesComponent,    
    ColorPicker        
];

@NgModule({
    imports: [
        ThemeModule, NotesRoutingModule,SearchModule, LoadingSpinnerModule
    ],
    declarations: [
        ...components,
    ]    
})
export class NotesModule { }