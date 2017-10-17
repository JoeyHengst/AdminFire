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


const components = [
    NoteLabelComponent,
    NoteRowComponent,
    NoteToolbarComponent,
    NotesContainerComponent,
    NotesListComponent,
    NoteCreator,
    ColorPicker
];

@NgModule({
    imports: [
        ThemeModule, NotesRoutingModule,
    ],
    declarations: [
        ...components,
    ],
    providers: [DataService]
})
export class NotesModule { }
