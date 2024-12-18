import { Component, HostListener } from '@angular/core';
import { Cabin } from '../models/Cabin';
import { CabinService } from '../services/cabin/Cabin.service';
import { DatepickerRangeComponent } from "../datepicker-range/datepicker-range.component";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ReservationService } from '../services/reservation/reservation.service';
import { ReservationRequest } from '../models/ReservationRequest';
import { LoginService } from '../services/auth/login.service';
import { Router } from '@angular/router';
declare var MercadoPago: any;
declare var bricksBuilder: any;
@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [DatepickerRangeComponent,JsonPipe,CurrencyPipe],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {
  displayMonths: number = 2; // Valor por defecto

 

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustDisplayMonths(event.target.innerWidth);
  }

  adjustDisplayMonths(width: number): void {
    if (width < 768) { 
      this.displayMonths = 1;
    } else {
      this.displayMonths = 2;
    }
  }
  userLoginOn: boolean;

  request:ReservationRequest={
    cabinId:0,
    endDate:null,
    startDate:null,
    userName:null
  };
  cabin:Cabin;
  transformedReservedDates: { year: number; month: number; day: number }[] = [];
  daysSelected:number=0;
  preferenceId: string | null = null;

  fromDate: NgbDateStruct | null = null;
  toDate: NgbDateStruct | null = null;
showLoader: boolean=false;
btnMpExist: boolean=false;
  ngOnInit(){
    this.adjustDisplayMonths(window.innerWidth);
    this.loginService.userLoginOn.subscribe(loged=>{
      if (!loged) {
        this.router.navigate(['/login']);
      }
    })

  }
  confirmReservation() {
    this.showLoader=true;
    console.log("aa")
    if (this.daysSelected > 0) {
      this.request.cabinId = this.cabin.id;
      this.request.userName = sessionStorage.getItem("username");
  
      // Convertir las fechas a formato "YYYY-MM-DD"
      this.request.startDate = this.formatDate(this.fromDate);
      this.request.endDate = this.toDate ? this.formatDate(this.toDate) : this.formatDate(this.fromDate); // Si toDate es null, usar fromDate
  
      this.reservationService.createReservation(this.request).subscribe(data=>{
        const mp = new MercadoPago("APP_USR-eba3ecac-9549-4d50-a35b-9169e15d6463");
        const bricksBuilder = mp.bricks();
        this.preferenceId=data.preferenceId;
        

        bricksBuilder.create("wallet", "wallet_container", {
          initialization: {
            preferenceId: this.preferenceId,
          },
          customization: {
            backUrls: {
              'error': '<http://localhost:4200/cabins>',
              'return': '<http://localhost:4200/profile>'
           },
            texts: {
              valueProp: "smart_option",
            },
          },
        });




        this.showLoader=false;
        this.btnMpExist=true;
      });
    }
  }
  
  // Método para formatear la fecha
  private formatDate(date: NgbDateStruct): string {
    const year = date.year;
    const month = date.month < 10 ? '0' + date.month : date.month; // Añadir cero delante si es un solo dígito
    const day = date.day < 10 ? '0' + date.day : date.day; // Añadir cero delante si es un solo dígito
    return `${year}-${month}-${day}`;
  }
onToDaysChange($event: number) {
    this.daysSelected=$event;
}


  // Método que maneja el cambio de fromDate
  onFromDateChange(date: NgbDateStruct) {
    this.fromDate = date;

  }

  // Método que maneja el cambio de toDate
  onToDateChange(date: NgbDateStruct) {
    this.toDate = date;
  }
 
  constructor(private router: Router,private loginService:LoginService,private cabinService:CabinService,private reservationService:ReservationService){
    this.cabin=cabinService.getSelectedCabin();
    this.transformReservedDates(this.cabin.reservedDates);
  }
  transformReservedDates(reservedDates: number[][]) {
    this.transformedReservedDates = reservedDates.map((dateArray) => ({
      year: dateArray[0],
      month: dateArray[1],
      day: dateArray[2],
    }));
  }

}
