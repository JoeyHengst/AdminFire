import {
    Component,
    EventEmitter,
    Input,
    Output
  } from '@angular/core';
  import { Record } from '../../../models/record.model';
  
  /**
   * @RecordsList: A component for rendering all RecordRows and
   * storing the currently selected Record
   */
  @Component({
    selector: 'records-list',
    templateUrl: './records-list.component.html'
  })
  export class RecordsListComponent {
    /**
     * @input recordList - the Record[] passed to us
     */
    @Input() recordList: Record[];
  
    /**
     * @output onRecordSelected - outputs the current
     *          Record whenever a new Record is selected
     */
    @Output() onRecordSelected: EventEmitter<Record>;
    /**
     * @output onColorSelected - outputs the current
     *          Color whenever a new Record is selected
     */
    @Output() onColorSelected: EventEmitter<Record>;
  
    /**
     * @property currentRecord - local state containing
     *             the currently selected `Record`
     */
    private currentRecord: Record;
    public toolbar: boolean;
    public currentId: string;  
  
    constructor() {
      this.onRecordSelected = new EventEmitter();
      this.onColorSelected = new EventEmitter();
    }
  
    clicked(record: Record): void {
      this.currentRecord = record;   
      this.onRecordSelected.emit(record);
      this.onColorSelected.emit(record);
    }
  
    isSelected(record: Record): boolean {
      if (!record || !this.currentRecord) {
        return false;
      }
      return record.id === this.currentRecord.id;
    }
  
    toggleToolbar(value: boolean, record: Record){    
      this.currentId = record.id;
      this.toolbar = value;    
    }
  
  }
  