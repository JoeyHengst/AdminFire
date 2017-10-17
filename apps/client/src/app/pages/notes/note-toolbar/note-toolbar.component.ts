import { EmitterService } from './../../../services/emitter.service';
import { Note } from './../../../models/note.model';
import {
    Component,
    Input, EventEmitter, Output
} from '@angular/core';

/**
 * @NoteToolbarDepartment: A component to show the toolbar   
 */
@Component({
    selector: 'note-toolbar',
    templateUrl: './note-toolbar.component.html',
    styleUrls: ['./note-toolbar.component.scss']
})
export class NoteToolbarComponent {
    @Input() currentNote: string;
    @Input() id: string;
    colors: Array<string> = ['#FAFAFA', '#FC8A82', '#FDD085', '#FEFE93', '#CCFE95', '#AAFFEB', '#85D8FE', '#86B2FD', '#1B1527', '#F7BBD0', '#D6CCC8', '#CFD8DC'];

    constructor() {
    }

    updateColor(color: string) {
        let newColor: Note = {
            color: color
        };

        EmitterService.get(this.id).emit(newColor);

    }
}