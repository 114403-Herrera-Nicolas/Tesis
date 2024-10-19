import { Component } from '@angular/core';
import { ReservationDto } from '../../models/ReservationDto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationService } from '../../services/reservation/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-pending',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './payment-pending.component.html',
  styleUrl: './payment-pending.component.css'
})
export class PaymentPendingComponent {

  reservation:ReservationDto;
  parametro:string;

  constructor(private reservationService:ReservationService,private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.parametro = params.get('id'); // 'id' es el nombre del parámetro que esperas en la URL
      console.log(this.parametro);
      this.reservationService.getReservationByid(this.parametro).subscribe(data=>{this.reservation=data});
    });

  }
}
