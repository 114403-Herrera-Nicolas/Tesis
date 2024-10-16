import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfoComponent } from "../../user-info/user-info.component";
import { ReservationListComponent } from "../../reservation-list/reservation-list.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, UserInfoComponent, ReservationListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
