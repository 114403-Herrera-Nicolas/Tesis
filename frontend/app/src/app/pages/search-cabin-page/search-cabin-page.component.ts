import { Component } from '@angular/core';
import { FeatureFilterComponent } from "../../feature-filter/feature-filter.component";
import { CabinListComponent } from "../../cabin-list/cabin-list.component";
import { CabinSearchComponent } from "../../cabin-search/cabin-search.component";

@Component({
  selector: 'app-search-cabin-page',
  standalone: true,
  imports: [FeatureFilterComponent, CabinListComponent, CabinSearchComponent],
  templateUrl: './search-cabin-page.component.html',
  styleUrl: './search-cabin-page.component.css'
})
export class SearchCabinPageComponent {

}
