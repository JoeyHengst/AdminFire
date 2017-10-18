import { FirestoreService, EmitterService } from './../../../services/index';
import { Note } from './../../../models/note.model';
import {
    Component,
    Input, EventEmitter, Output
} from '@angular/core';
import { Observable } from 'rxjs/Observable'
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
    showMenu: boolean;
    note$: Observable<Note>;
    note: Note;
    colors: Array<string> = ['#FAFAFA', '#FC8A82', '#FDD085', '#FEFE93', '#CCFE95', '#AAFFEB', '#85D8FE', '#86B2FD', '#1B1527', '#F7BBD0', '#D6CCC8', '#CFD8DC'];

    constructor(private db: FirestoreService) {
        
    }

    updateColor(color: string) {
        let newColor: Note = {
            color: color
        };

        EmitterService.get(this.id).emit(newColor);

    }

    sendTrash() {
        this.db.update('notes' + '/' + this.currentNote, {pending_removal: true});               
    }

    makeCopy(){
        const doc = this.db.doc('notes' + '/' + this.currentNote).valueChanges().take(1).toPromise()
        doc.then (res => {
            return res ? this.db.add('notes', res) : console.log('bestaat niet');
        }) 
    }

    toggleMoreMenu() {
        this.showMenu = !this.showMenu;
    }
}