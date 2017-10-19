import { SearchBoxComponent } from './search-box/search-box.component';
import { RefinementListComponent } from './refinement-list/refinement-list.component';
import { HitsComponent } from './hits/hits.component';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [HitsComponent, RefinementListComponent, SearchBoxComponent],
  exports: [HitsComponent, RefinementListComponent, SearchBoxComponent]
})
export class SearchModule { }