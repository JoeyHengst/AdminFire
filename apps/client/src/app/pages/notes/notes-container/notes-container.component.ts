import { ActivatedRoute } from '@angular/router';
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
 * @Note container: contains the notes
 */
@Component({
    selector: 'notes-container',
    templateUrl: './notes-container.component.html'
})
export class NotesContainerComponent {
    notes$: Observable<Note[]>;    
    @Input() id: string;
    public host_id: "HOST_COMPONENT";
    public color: string;
    public docId: string[];
    showSpinner: boolean = true;
    url : string;

    constructor(private afs: AngularFirestore, private db: FirestoreService, private activeRoute: ActivatedRoute) {
        activeRoute.url.subscribe(() => {
            activeRoute.snapshot;
            this.url = activeRoute.snapshot.url[0].path;                        
        });
        
        this.notes$ = this.db.col$('notes', ref => ref.orderBy('createdAt').where('pending_removal', '==', false).where('type', '==', this.url).where('archived','==', false));
        this.notes$.subscribe(() => this.showSpinner = false);
        this.db.inspectCol('notes');        
        
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
            this.db.update(`notes/${note.id}` , this.color);
            this.color = null;
        }
    }
}
