import {
  Component,
  Input, Output, EventEmitter,
  HostBinding
} from '@angular/core';
import { Note } from './../../../models/note.model';

/**
 * @NoteRow: A component for the view of single Note
 */
@Component({
  selector: 'note-row',
  templateUrl: './note-row.component.html',
  styleUrls: ['./note-row.component.scss']
})
export class NoteRowComponent {
  @Input() note: Note;
  @Input() toolbar: boolean;
  @Input() currentNote: string;  
  @HostBinding('attr.class') cssClass = 'item';
  public host_id: "HOST_COMPONENT";


  constructor(){    
  }

}
