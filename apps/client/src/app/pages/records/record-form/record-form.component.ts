import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Record } from './../../../models/record.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../records.actions';
import * as fromRecords from '../records.reducer';

@Component({
  selector: 'record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit {
  record: any;
  recordForm: FormGroup;
  isNew: boolean = true;
  id: number;
  private sub: any;
  url;

  constructor(private db: FirestoreService, private afs: AngularFirestore, private fb: FormBuilder, private route: ActivatedRoute, private store: Store<fromRecords.State>, private router: Router) {
    this.recordForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      label: ['', Validators.required],
      image: ['', Validators.required]
    });
    route.url.subscribe(() => {
      route.snapshot;
      this.url = route.snapshot.url[0].path;
      console.log(this.url);
    });
  }

  ngOnInit() {

  }

  createNewRecord(form: FormGroup) {
    const id = this.afs.createId();
    const record = {
      id: id,
      title: form.get('title').value,
      image: form.get('image').value,
      label: form.get('label').value,
      content: form.get('content').value,
      type: 'line',
      archived: false,
      pending_removal: false
    };

    this.store.dispatch(new actions.Create(record));

    // this.db.add('records', {title, image, label, content, archived: false, type: 'line', pending_removal: false})
    // .then(() => this.router.navigate(['/line']));
  }

}