import {
    Component,
    Input
  } from '@angular/core';
  import { Note } from './../../../models/note.model'; 
  
  /**
   * @NoteLabelDepartment: A component to show the labels of an Note   
   */
  @Component({
    selector: 'note-label',
    templateUrl: './note-label.component.html'
  })
  export class NoteLabelComponent {
    @Input() note: Note;
  }
  