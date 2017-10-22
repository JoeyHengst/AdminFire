import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Record } from './../../../models/record.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit {
  record: any;
  recordForm: FormGroup;
  constructor(private db: FirestoreService, private fb: FormBuilder) {
    this.recordForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      label: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  createNewRecord(value: Record) {
    this.db.add('records', value);
    this.buildForm();
  }
  saveRecordChanges() {
    if (this.recordForm.status != 'VALID') {
      console.log('form is not valid, cannot save to database')
      return
    }
    const data: Record = this.recordForm.value
    this.db.update(`records/${data.id}`, data);
  }
  private buildForm() {
    if (this.record) {
      this.record.subscribe(record => {
        this.recordForm.patchValue(record)
      })
    }
  }
}