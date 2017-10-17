import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject'



@Component({
    selector: 'note-search',
    template: `<input type="text" (keydown)="search($event)" placeholder="search movies..." class="input">`
})
export class NoteSearchComponent implements OnInit {
    notes;
    startAt = new Subject();
    endAt = new Subject();
    lastKeypress: number = 0;

    constructor(private dataService: DataService) { }
    ngOnInit() {
        // this.dataService.getSearchData(this.startAt, this.endAt)
        //     .subscribe(movies => this.movies = movies)
    }

    search($event) {
        if ($event.timeStamp - this.lastKeypress > 200) {
            let q = $event.target.value
            this.startAt.next(q)
            this.endAt.next(q + "\uf8ff")
        }
        this.lastKeypress = $event.timeStamp
    }
}