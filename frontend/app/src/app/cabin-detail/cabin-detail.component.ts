import { Component, inject, TemplateRef } from '@angular/core';
import { CabinService } from '../services/cabin/Cabin.service';
import { Cabin } from '../models/Cabin';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerRangeComponent } from '../datepicker-range/datepicker-range.component';
import { LoginService } from '../services/auth/login.service';
import { LoginComponent } from "../auth/login/login.component";
import { RegisterUserComponent } from "../auth/register-user/register-user.component";
@Component({
  selector: 'app-cabin-detail',
  standalone: true,
  imports: [NgbDatepickerModule, NgbModule, JsonPipe, FormsModule, DatepickerRangeComponent, RouterModule, LoginComponent, RegisterUserComponent,CurrencyPipe],
  templateUrl: './cabin-detail.component.html',
  styleUrl: './cabin-detail.component.css'
})
export class CabinDetailComponent {
  isLoginMode: boolean=true;
  switchToRegister() {
    this.isLoginMode = false;  
  }

  switchToLogin() {
    this.isLoginMode = !this.isLoginMode;  
  }

	private modalService = inject(NgbModal);
	closeResult = '';
  userLoginOn: boolean;

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' , ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}




navigateToReservation() {
  console.log(this.loginService.currentUserLoginOn.value);
  if (this.loginService.currentUserLoginOn.value) {
    this.cabinService.selectedcabin(this.cabin);
    this.router.navigate(['/reservation']);   
  }else{
    alert("debes estar logeado")
  }
 
}
  cabin: Cabin ;
  transformedReservedDates: { year: number; month: number; day: number }[] = [];
  baseUrl: string = environment.urlApi;
  parametro: string;
  role: string;
  model: any;

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    this.loginService.currentUserLoginOn.subscribe(data => {
      this.userLoginOn = data;
    });
  }
  
  transformReservedDates(reservedDates: number[][]) {
    this.transformedReservedDates = reservedDates.map((dateArray) => ({
      year: dateArray[0],
      month: dateArray[1],
      day: dateArray[2],
    }));
  }

  constructor(private cabinService:CabinService,private route: ActivatedRoute,private router: Router,
              private loginService:LoginService
  ){
    this.route.paramMap.subscribe(params => {
      this.parametro = params.get('id'); // 'id' es el nombre del parámetro que esperas en la URL
      console.log(this.parametro);
      
    });

    cabinService.getCabinById(this.parametro).subscribe(cabin=>{
      this.cabin=cabin;
      console.log(this.cabin);
      this.transformReservedDates(cabin.reservedDates);}
    );
  }
}

