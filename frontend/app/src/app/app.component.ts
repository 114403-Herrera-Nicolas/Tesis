import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { LoginService } from './services/auth/login.service';

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
 
  role: string | null = '';
  logeado:boolean;
  constructor(private loginService:LoginService){

  }
  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    this.loginService.userLoginOn.subscribe(log=>{
      this.logeado=log;
    })
    console.log(this.logeado);
    console.log(this.role);
  }
  
}
