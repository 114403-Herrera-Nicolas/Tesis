import { Component } from '@angular/core';
import { Feature } from '../models/Feature';
import { FeatureService } from '../services/features/feature.service';
import { CabinService } from '../services/cabin/Cabin.service';

@Component({
  selector: 'app-feature-filter',
  standalone: true,
  imports: [],
  templateUrl: './feature-filter.component.html',
  styleUrl: './feature-filter.component.css'
})
export class FeatureFilterComponent {
  features:Feature[]=[];
   featuresSelected:number[]=[] 
  constructor(private featureService:FeatureService,private cabinService:CabinService)
   { 
    this.featureService.getFeatures().subscribe(features=>this.features=features);
  }
  
  
  onFeatureChange(feature: Feature) {
    if(this.featuresSelected.includes(feature.id)){
      this.featuresSelected.splice(this.featuresSelected.indexOf(feature.id),1);


    }else{
      this.featuresSelected.push(feature.id);
    }
    //this.cabinService.
    
    this.cabinService.setFeaturesId(this.featuresSelected);
    this.cabinService.searchCabins().subscribe(s=>console.log(s));
  }
}
