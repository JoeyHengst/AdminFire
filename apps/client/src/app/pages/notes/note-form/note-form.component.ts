import { AngularFirestore } from 'angularfire2/firestore';
import { Note } from './../../../models/note.model';
import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import { ColorPicker } from './../color-picker/color-picker.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'note-creator',
    styleUrls: ['./note-form.component.scss'],
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './note-form.component.html'
})
export class NoteCreator {
    @Output() createNote = new EventEmitter();
    colors: Array<string> = ['#FAFAFA', '#FC8A82', '#FDD085', '#FEFE93', '#CCFE95', '#AAFFEB', '#85D8FE', '#86B2FD', '#1B1527', '#F7BBD0', '#D6CCC8', '#CFD8DC'];
    public elementRef;
    url: string;

    constructor(myElement: ElementRef, private activeRoute: ActivatedRoute, private afs: AngularFirestore) {
        this.elementRef = myElement;
        activeRoute.url.subscribe(() => {
            activeRoute.snapshot;
            this.url = activeRoute.snapshot.url[0].path;
        });
    }
    newNote: Note = {
        name: '',
        description: '',
        label: [],
        color: 'white',
        date: new Date
    };

    fullForm: boolean = false;
    colorSelected: boolean = false;

    onCreateNote() {
        const id = this.afs.createId();
        const note = {
            id: this.newNote.id,
            name: this.newNote.name,
            description: this.newNote.description,
            label: this.newNote.label,
            color: this.newNote.color,
            date: this.newNote.date,
            type: this.url,
            archived: false,
            pending_removal: false
        };

        if (this.newNote.name && this.newNote.description) {
            this.createNote.emit(note);
            this.reset();
        }
    }

    selectorColor(color: string) {
        this.colorSelected = true;
        this.newNote.color = color;
    }

    toggle(value: boolean) {
        this.fullForm = value;
    }

    reset() {
        this.newNote = {
            name: '',
            description: '',
            label: [],
            color: 'white',
            date: new Date
        }
    }

    handleClick(event: any) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
                break;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);

        if (inside && !this.colorSelected) {
            this.toggle(true);
        } else {
            if (this.colorSelected) {
                this.colorSelected = false;
                return;
            }
            this.toggle(false);
        }
    }
}