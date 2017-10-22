import { EmitterService } from './../../../services/emitter.service';
import {
    Component,
    EventEmitter, Input
} from '@angular/core';

import { Record } from './../../../models/record.model';
import { Observable } from 'rxjs/Observable'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from './../../../services/firestore.service';

/**
 * @Record trash: contains the trashed records
 */
@Component({
    selector: 'records-trash',
    templateUrl: './records-trash.component.html'
})
export class RecordsTrashComponent {
    records$: Observable<Record[]>;
    recordsCollectionRef: AngularFirestoreCollection<Record>;
    @Input() id: string;
    public host_id: "HOST_COMPONENT";
    public color: string;
    public docId: string[];
    showSpinner: boolean = true;

    constructor(private afs: AngularFirestore, private db: FirestoreService) {
        this.records$ = this.db.col$('records', ref => ref.orderBy('createdAt').where('pending_removal', '==', true));
        this.records$.subscribe(() => this.showSpinner = false);
        //this.db.inspectCol('notes');
        this.recordsCollectionRef = this.afs.collection<Record>('records');
    }

    recordWasSelected(record: Record): void {
        //console.log('Note clicked: ', note);
    }

    updateRecord(record: Record) {
        EmitterService.get(this.id).subscribe(value => {
            this.color = value;
        });
        if (this.color) {
            this.db.update('records' + '/' + record.id , this.color);
            this.color = null;
        }
    }
}
