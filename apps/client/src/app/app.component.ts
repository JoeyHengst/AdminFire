import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { InstantSearchService } from './services/search.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private instantSearchService: InstantSearchService, private router: Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();

    this.router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
           console.log(event);
         }
    })

  }

  ngAfterViewInit() {
    this.instantSearchService.search.start();
  }
}
