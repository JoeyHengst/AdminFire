import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Record } from './../../../models/record.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit {
  record: any;
  recordForm: FormGroup;
  isNew : boolean = true;
  id: number;
  private sub :any;

  constructor(private db: FirestoreService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.recordForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      label: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if(this.id){
        this.isNew = false;
      }
      // In a real app: dispatch action to load the details here.
    });
    
  }

  createNewRecord(form:any) {
    const { title, image, label, content, type, archived, pending_removal } = form.value;
    
    this.db.add('records', {title, image, label, content, archived: false, type: 'line', pending_removal: false});
  }

  saveRecordChanges() {
    if (this.recordForm.status != 'VALID') {
      console.log('form is not valid, cannot save to database')
      return
    }
    if(this.id){
    console.log(this.recordForm.value);
    this.recordForm.patchValue(this.recordForm.valueChanges)
    const data: Record = this.recordForm.value
    this.db.update(`records/${this.id}`, data);
    }
  }
  
}