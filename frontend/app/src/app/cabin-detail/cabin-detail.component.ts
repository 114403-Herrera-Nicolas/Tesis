import { Component } from '@angular/core';
import { CabinService } from '../services/cabin/Cabin.service';
import { Cabin } from '../models/Cabin';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cabin-detail',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './cabin-detail.component.html',
  styleUrl: './cabin-detail.component.css'
})
export class CabinDetailComponent {
  cabin: Cabin ;
baseUrl: string = environment.urlApi;
  parametro: string;
  role: string;

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
  }

  constructor(private cabinService:CabinService,private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.parametro = params.get('id'); // 'id' es el nombre del parámetro que esperas en la URL
      console.log(this.parametro);
    });

    cabinService.getCabinById(this.parametro).subscribe(cabin=>this.cabin=cabin);
  }
}
