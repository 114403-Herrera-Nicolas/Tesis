import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation/reservation.service';
import { ReservationDto } from '../../models/ReservationDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  reservation:ReservationDto;
  parametro:string;

  constructor(private reservationService:ReservationService,private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.parametro = params.get('id'); // 'id' es el nombre del parámetro que esperas en la URL
      console.log(this.parametro);
      this.reservationService.getReservationByid(this.parametro).subscribe(data=>{this.reservation=data});
    });

  }
  ngOnInit(){
    
    
  }
}
