import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import instantsearch from 'instantsearch.js/es';


@Injectable()
export class InstantSearchService {
  search = instantsearch({
    appId: environment.algolia.appId,
    apiKey: environment.algolia.apiKey,
    indexName: environment.algolia.indexName,
    urlSync: environment.algolia.urlSync
  });

  constructor() {}
}