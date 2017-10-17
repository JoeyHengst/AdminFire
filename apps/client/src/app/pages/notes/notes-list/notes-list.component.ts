import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Note } from '../../../models/note.model';

/**
 * @NotesList: A component for rendering all NoteRows and
 * storing the currently selected Note
 */
@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html'
})
export class NotesListComponent {
  /**
   * @input noteList - the Note[] passed to us
   */
  @Input() noteList: Note[];

  /**
   * @output onNoteSelected - outputs the current
   *          Note whenever a new Note is selected
   */
  @Output() onNoteSelected: EventEmitter<Note>;
  /**
   * @output onNoteSelected - outputs the current
   *          Note whenever a new Note is selected
   */
  @Output() onColorSelected: EventEmitter<Note>;

  /**
   * @property currentNote - local state containing
   *             the currently selected `Note`
   */
  private currentNote: Note;
  public toolbar: boolean;
  public currentId: string;  

  constructor() {
    this.onNoteSelected = new EventEmitter();
    this.onColorSelected = new EventEmitter();
  }

  clicked(note: Note): void {
    this.currentNote = note;   
    this.onNoteSelected.emit(note);
    this.onColorSelected.emit(note);
  }

  isSelected(note: Note): boolean {
    if (!note || !this.currentNote) {
      return false;
    }
    return note.id === this.currentNote.id;
  }

  toggleToolbar(value: boolean, note:Note){    
    this.currentId = note.id;
    this.toolbar = value;    
  }

}
