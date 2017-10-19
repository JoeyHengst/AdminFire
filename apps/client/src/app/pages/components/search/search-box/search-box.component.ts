import { Component, OnInit } from '@angular/core';
import { connectSearchBox } from 'instantsearch.js/es/connectors';

import { InstantSearchService } from '../../../../services/index';

@Component({
    selector: 'app-search-box',
    template: `<input
  type="text"
  [value]="state.query"
  (input)="handleChange($event.target.value)"
/>`,
    styles: []
})
export class SearchBoxComponent implements OnInit {
    // Define SearchBox initial state
    state: { query: string; refine: Function } = {
        query: '',
        refine() { }
    };

    constructor(private instantSearchService: InstantSearchService) { }

    ngOnInit() {
        const widget = connectSearchBox(this.updateState);
        this.instantSearchService.search.addWidget(widget());
    }

    updateState = (state, isFirstRendering) => {
        // asynchronous update of the state
        // avoid `ExpressionChangedAfterItHasBeenCheckedError`
        if (isFirstRendering) {
            return Promise.resolve(null).then(() => {
                this.state = state;
            });
        }

        this.state = state;
    }

    handleChange(query) {
        this.state.refine(query)
    }
}