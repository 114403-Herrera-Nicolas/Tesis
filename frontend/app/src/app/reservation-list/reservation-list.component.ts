import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation/reservation.service';
import { ReservationDto } from '../models/ReservationDto';
import { LoginService } from '../services/auth/login.service';
import { UserInfo } from '../models/UserInfo';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
import { ReservationStatePipe } from "../pipes/reservation-state.pipe";

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, ReservationStatePipe,CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
getStatusClass(status: string) {
  switch (status) {
    case 'PENDING':
      return 'badge bg-warning';  // Amarillo
    case 'CANCELLED':
      return 'badge bg-danger';   // Rojo
    case 'COMPLETED':
      return 'badge bg-success';  // Verde
    case 'REFUNDED':
      return 'badge bg-info';     // Azul
    default:
      return 'badge bg-secondary'; // Gris por defecto
  }
}
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
