import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginRequest } from '../../services/auth/loginRequest';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() redirect:boolean=true;
  @Output() loginEvent=new EventEmitter<boolean>();
  loginError:string="";
  loginForm=this.formBuilder.group({
    username:['',[Validators.required]],
    password: ['',Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.username;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          
          if (this.redirect) {
            this.router.navigateByUrl('/cabins');
          }else{
            this.loginEvent.emit(true);
          }
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      
    }
  }

}
