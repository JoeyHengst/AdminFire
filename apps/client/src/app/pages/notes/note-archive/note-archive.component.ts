import { EmitterService } from './../../../services/emitter.service';
import {
    Component,
    EventEmitter, Input
} from '@angular/core';

import { Note } from './../../../models/note.model';
import { Observable } from 'rxjs/Observable'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from './../../../services/firestore.service';

/**
 * @Note archive: contains the archived notes
 */
@Component({
    selector: 'notes-archive',
    templateUrl: './note-archive.component.html'
})
export class NotesArchiveComponent {
    notes$: Observable<Note[]>;
    notesCollectionRef: AngularFirestoreCollection<Note>;
    @Input() id: string;
    public host_id: "HOST_COMPONENT";
    public color: string;
    public docId: string[];
    showSpinner: boolean = true;

    constructor(private afs: AngularFirestore, private db: FirestoreService) {
        this.notes$ = this.db.col$('notes', ref => ref.orderBy('createdAt').where('pending_removal', '==', false).where('archived', '==', true));
        this.notes$.subscribe(() => this.showSpinner = false);
        //this.db.inspectCol('notes');
        this.notesCollectionRef = this.afs.collection<Note>('notes');
    }

    noteWasSelected(note: Note): void {
        //console.log('Note clicked: ', note);
    }

    onCreateNote(note: Note) {
        this.db.add('notes', note);
    }

    updateNote(note: Note) {
        EmitterService.get(this.id).subscribe(value => {
            this.color = value;
        });
        if (this.color) {
            this.db.update('notes' + '/' + note.id , this.color);
            this.color = null;
        }
    }
}
