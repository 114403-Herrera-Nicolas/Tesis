import { Component } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { UserInfo } from '../models/UserInfo';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
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
    })
  }
}
