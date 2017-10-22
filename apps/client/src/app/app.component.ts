import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { InstantSearchService } from './services/search.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private instantSearchService: InstantSearchService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }

  ngAfterViewInit() {
    this.instantSearchService.search.start();
  }
}
