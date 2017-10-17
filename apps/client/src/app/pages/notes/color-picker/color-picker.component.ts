import { EmitterService } from './../../../services/emitter.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from './../../../models/note.model';

@Component({
    selector: 'color-picker',
    styles: [`
    .color-selector {
      position: relative;
      z-index: 999;
    }
    .selector {
      width: 182px;
      border: 1px solid lightgrey;
      padding: 10px;
      background-color: #efefef;
      position: absolute;      
      top: -50px;
      left: 0;
    }
    .color {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .color:hover {
      border: 2px solid darkgrey;
    }
    .icon {
      font-size: 1.4rem;
      color: grey;
      cursor: pointer;
    }
  `],
    templateUrl: './color-picker.component.html'
})
export class ColorPicker {
    @Input() colors: Array<string> = [];
    @Input() currentNote: Note;   
    @Output() selected = new EventEmitter();
    isSelectorVisible: boolean = false;

    showSelector(value: boolean) {
        this.isSelectorVisible = value;
    }

    selectColor(event, color) {
        this.showSelector(false);
        this.selected.emit(color);
    }
}