import { FirestoreService } from './../../../services/firestore.service';
import { EmitterService } from './../../../services/emitter.service';
import { Note } from './../../../models/note.model';
import {
    Component,
    Input, EventEmitter, Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../notes.actions';
import * as fromNotes from '../notes.reducer';
import { Router } from '@angular/router';

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
    inArchive: boolean = false;
    inTrash: boolean = false;
    note$: Observable<Note>;
    note: Note;
    public href: string = "";
    colors: Array<string> = ['#FAFAFA', '#FC8A82', '#FDD085', '#FEFE93', '#CCFE95', '#AAFFEB', '#85D8FE', '#86B2FD', '#1B1527', '#F7BBD0', '#D6CCC8', '#CFD8DC'];

    constructor(private db: FirestoreService, private router: Router, private store: Store<fromNotes.State>) {
        const archive: string = 'archive';
        const trash: string = 'trash';

        this.href = this.router.url;

        if (this.href.indexOf(archive) !== -1) {
            this.inTrash = false;
            this.inArchive = true;
        }

        if (this.href.indexOf(trash) !== -1) {
            this.inArchive = false;
            this.inTrash = true;
        }
    }

    updateColor(color: string) {
        let newColor: Note = {
            color: color
        };

        EmitterService.get(this.id).emit(newColor);

    }

    sendArchive() {
        //this.db.update('notes' + '/' + this.currentNote, { archived: true });
        this.store.dispatch(new actions.Update(this.currentNote, { archived: true }));
    }

    unArchive() {
        //this.db.update('notes' + '/' + this.currentNote, { archived: false });
        this.store.dispatch(new actions.Update(this.currentNote, { archived: false }));
    }

    sendTrash() {
        //this.db.update('notes' + '/' + this.currentNote, { pending_removal: true });
        this.store.dispatch(new actions.Update(this.currentNote, { pending_removal: true }));
    }

    deleteForever() {
        //this.db.remove('notes' + '/' + this.currentNote);
        this.store.dispatch(new actions.Delete(this.currentNote));
    }

    restore() {
        //this.db.update('notes' + '/' + this.currentNote, { archived: false, pending_removal: false });
        this.store.dispatch(new actions.Update(this.currentNote, { archived: false, pending_removal: false }));
    }

    makeCopy() {
        const doc = this.db.doc('notes' + '/' + this.currentNote).valueChanges().take(1).toPromise()
        doc.then(res => {
            return res ? this.store.dispatch(new actions.Create(res)) : console.log('bestaat niet');
        })
    }

    toggleMoreMenu() {
        this.showMenu = !this.showMenu;
    }
}