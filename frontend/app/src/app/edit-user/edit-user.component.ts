import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/auth/user';
import { UserInfo } from '../models/UserInfo';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent{
  @Input() user: UserInfo;
  @Output() editEvent = new EventEmitter<boolean>(); 
editUser() {
  this.userService.updateUser(this.registerForm.value).subscribe({
    next: (data) => {
      this.editEvent.emit(true);
       
    },
    error: (error) => {
      console.log(error);
    }
})};

  registerForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder, private userService: UserService) {
    
   }
   ngOnInit(){
    console.log(this.user);
    this.registerForm = this.formBuilder.group({
      id: [this.user.userId],
      username: [this.user.userName, [Validators.required, Validators.email]],
      firstname: [this.user.firstName, Validators.required],
      lastname: [this.user.lastName, Validators.required],
    });
   }

   get email(){
    return this.registerForm.controls['username'];
  }

  get lastname()
  {
    return this.registerForm.controls['lastname'];
  }
  get firstname()
  {
    return this.registerForm.controls['firstname'];
  }
 
}

