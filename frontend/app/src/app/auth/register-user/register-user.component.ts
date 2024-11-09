import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { RegisterRequest } from '../../models/RegisterRequest';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink,FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
registerError: any;
registerForm: FormGroup;
terms: boolean = false;
login() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      let value: RegisterRequest = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname
      }
      this.loginService.register(value).subscribe({
       
        error: (errorData) => {
          console.error(errorData);
          this.registerError=errorData;
        },
        complete() {
          if (this.redirect) {
            this.router.navigateByUrl('/cabins');
          }else{
            this.loginEvent.emit(true);
          }
          this.loginForm.reset();
        },

      })
    }
}
  @Input() redirect: boolean = true;
  @Output() loginEvent = new EventEmitter<boolean>();
  get email(){
    return this.registerForm.controls['username'];
  }

  get password()
  {
    return this.registerForm.controls['password'];
  }
  get passwordCopy()
  {
    return this.registerForm.controls['passwordCopy'];
  }
  get lastname()
  {
    return this.registerForm.controls['lastname'];
  }
  get firstname()
  {
    return this.registerForm.controls['firstname'];
  }
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordCopy: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      terms:[false, Validators.requiredTrue]
    }, {
      validators: matchingFieldsValidator('password', 'passwordCopy') 
    });
   }

 
}
function matchingFieldsValidator(field1: string, field2: string): ValidatorFn  {
  return (formGroup: AbstractControl) => {
    const control1 = formGroup.get(field1);
    const control2 = formGroup.get(field2);

    if (!control1 || !control2) {
      return null; 
    }

    const areFieldsMatching = control1.value === control2.value;
    return areFieldsMatching ? null : { fieldsDoNotMatch: true };
  };
}

