import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation/reservation.service';
import { ReservationDto } from '../models/ReservationDto';
import { LoginService } from '../services/auth/login.service';
import { UserInfo } from '../models/UserInfo';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [DatePipe,CurrencyPipe,RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  reservations: ReservationDto[] = [];
  user:UserInfo={
    token: '',
    role: '',
    userId: 0,
    userName: '',
    firstName: '',
    lastName: ''
  }
  baseUrl: string = environment.urlApi;
  constructor(private reservationService:ReservationService,private loginService:LoginService) { }
  ngOnInit(){
    this.loginService.user.subscribe(data=>{this.user=data;});
    this.reservationService.getReservationsByUserid(this.user.userId).subscribe(reservations => {
      this.reservations = reservations;
    })
  }
}
