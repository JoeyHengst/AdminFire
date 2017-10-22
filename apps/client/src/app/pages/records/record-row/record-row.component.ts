import {
    Component,
    Input, Output, EventEmitter,
    HostBinding
  } from '@angular/core';
  import { Record } from './../../../models/record.model';
  
  /**
   * @NoteRow: A component for the view of single Note
   */
  @Component({
    selector: 'record-row',
    templateUrl: './record-row.component.html',
    styleUrls: ['./record-row.component.scss']
  })
  export class RecordRowComponent {
    @Input() record: Record;
    @Input() toolbar: boolean;
    @Input() currentRecord: string;  
    @HostBinding('attr.class') cssClass = 'item';
    public host_id: "RECORD_COMPONENT";
  
  
    constructor(){    
    }
  
  }