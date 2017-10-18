import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as instantsearch from 'instantsearch.js'

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    search: any;
    constructor() { }
    ngOnInit() {
        const options = environment.algolia;
        this.search = instantsearch(options);

        this.search.addWidget(
            instantsearch.widgets.searchBox({
                container: '#search-box'
            })
        );
        // initialize hits widget
        this.search.addWidget(
            instantsearch.widgets.hits({
                container: '#hits',
            })
        );

        this.search.addWidget(
            instantsearch.widgets.pagination({
                container: '#pagination',
                maxPages: 20,
            })
        );

        this.search.addWidget(
            instantsearch.widgets.analytics({
                pushFunction: (query, state, results) => {
                    console.log(query)
                    console.log(state)
                    console.log(results)
                }
            })
        );

        this.search.start();
    }


}