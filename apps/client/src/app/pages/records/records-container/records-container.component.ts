import { Record } from './../../../models/record.model';
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
 * @Records container: contains the records
 */
@Component({
    selector: 'records-container',
    templateUrl: './records-container.component.html'
})
export class RecordsContainerComponent {
    records$: Observable<Record[]>;
    recordsCollectionRef: AngularFirestoreCollection<Record>;
    @Input() id: string;
    public host_id: "RECORD_COMPONENT";
    public color: string;
    public docId: string[];
    showSpinner: boolean = true;
    url : string;

    constructor(private afs: AngularFirestore, private db: FirestoreService, private activeRoute: ActivatedRoute) {
        activeRoute.url.subscribe(() => {
            activeRoute.snapshot;
            this.url = activeRoute.snapshot.url[0].path;                        
        });
        
        this.records$ = this.db.col$('records', ref => ref.orderBy('createdAt').where('pending_removal', '==', false).where('type', '==', this.url).where('archived','==', false));
        this.records$.subscribe(() => this.showSpinner = false);
        this.db.inspectCol('records');
        this.recordsCollectionRef = this.afs.collection<Record>('records');
        
    }

    recordWasSelected(record: Record): void {
        //console.log('Note clicked: ', note);
    }

    onCreateRecord(record: Record) {
        this.db.add('records', record);
    }

    updateRecord(record: Record) {
        EmitterService.get(this.id).subscribe(value => {
            this.color = value;
        });
        if (this.color) {
            this.db.update(`records/${record.id}` , this.color);
            this.color = null;
        }
    }
}
