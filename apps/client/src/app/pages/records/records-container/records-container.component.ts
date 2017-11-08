import { Update } from './../../notes/notes.actions';
import { Record } from './../../../models/record.model';
import { ActivatedRoute } from '@angular/router';
import { EmitterService } from './../../../services/emitter.service';
import {
    Component,
    EventEmitter, Input, OnInit
} from '@angular/core';

import { Note } from './../../../models/note.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../records.actions';
import * as fromRecords from '../records.reducer';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from './../../../services/firestore.service';

/**
 * @Records container: contains the records
 */
@Component({
    selector: 'records-container',
    templateUrl: './records-container.component.html'
})
export class RecordsContainerComponent implements OnInit {
    records$: Observable<Record[]>;
    recordsCollectionRef: AngularFirestoreCollection<Record>;
    @Input() id: string;
    public host_id: "RECORD_COMPONENT";
    public color: string;
    public docId: string[];
    showSpinner: boolean = true;
    url: string;

    constructor(private afs: AngularFirestore, private db: FirestoreService, private activeRoute: ActivatedRoute, private store: Store<fromRecords.State>) {
        activeRoute.url.subscribe(() => {
            activeRoute.snapshot;
            this.url = activeRoute.snapshot.url[0].path;
        });

        //this.records$ = this.db.col$('records', ref => ref.orderBy('createdAt').where('pending_removal', '==', false).where('type', '==', this.url).where('archived','==', false));
        //this.records$.subscribe(() => this.showSpinner = false);
        //this.db.inspectCol('records');
    }

    ngOnInit() {
        this.records$ = this.store.select(fromRecords.selectAll);
        this.store.dispatch(new actions.Query(this.url));
    }

    recordWasSelected(record: Record): void {
        //console.log('Note clicked: ', note);
    }

    onCreateRecord(record: Record) {
        //this.db.add('records', record);
        this.store.dispatch(new actions.Create(record));
    }

    updateRecord(record: Record) {
        EmitterService.get(this.id).subscribe(value => {
            this.color = value;
        });
        if (this.color) {
            //this.db.update(`records/${record.id}` , this.color);
            this.store.dispatch(new actions.Update(record.id, record));
            this.color = null;
        }
    }
}
