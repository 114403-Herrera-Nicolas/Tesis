import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { LoginService } from './services/auth/login.service';
import { UserInfo } from './models/UserInfo';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent,
    RouterLink,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
logout() {
  this.loginService.logout();
}
  title = 'app';
  user: UserInfo = {
    token: '',
    role: '',
    userId: 0,
    userName: '',
    firstName: '',
    lastName: ''
  };
  role: String | null = '';
  logeado:boolean;
  constructor(private loginService:LoginService,private router: Router){

  }

 

  



  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Desplazar automáticamente al fragmento si está presente en la URL
      const fragment = this.router.routerState.snapshot.root.fragment;
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
   this.loginService.user.subscribe(data=>{
    this.user=data;
   })
    this.loginService.currentUserRol.subscribe(data => {
      this.role=data;
      console.log(data);
    })
    this.loginService.userLoginOn.subscribe(log=>{
      this.logeado=log;
      
    })

  }
  
}
