import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { UserInfo } from '../models/UserInfo';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EditUserComponent } from "../edit-user/edit-user.component";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [UpperCasePipe, EditUserComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
editUser() {
  this.editMode = false;
}


  editMode:boolean=false;
  userInfo:UserInfo={
    token: '',
    role: '',
    userId: 0,
    userName: '',
    firstName: '',
    lastName: ''
  };
  ngOnInit(){
    this.loginService.userLoginOn.subscribe(loged=>{
      if (!loged) {
        this.router.navigate(['/login']);
      }
    })
  }

  constructor(private loginService:LoginService,private router: Router){
    loginService.user.subscribe(data=>{
      this.userInfo=data;
      console.log(data);
    })
  }
  openEditMode() {
    this.editMode = true;
  }
}
