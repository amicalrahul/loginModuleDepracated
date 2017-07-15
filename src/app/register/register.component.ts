import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() loginAfterRegister: boolean;
  @Output() postRegister = new EventEmitter();
  @Output() postLogin = new EventEmitter();
  private registerForm: any = null;



  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  register() {
    const registerModel = {
      FirstName: this.registerForm.value.firstName,
      LastName: this.registerForm.value.lastName,
      Email: this.registerForm.value.email,
      Password: this.registerForm.value.password,
      ConfirmPassword: this.registerForm.value.password
    };
    this.authenticationService.register(registerModel)
      .subscribe(registerResponse => {
        if (this.postRegister) {
          this.postRegister.emit(registerResponse);
          this.loginAfter();
        } else {
          this.loginAfter();
        }
      });
  }

  loginAfter() {
    if (this.loginAfterRegister) {
      this.authenticationService.login(this.registerForm.value.email, this.registerForm.value.password)
        .subscribe(loginResponse => {
          if (this.postLogin) {
            this.postLogin.emit(loginResponse);
          }
        });
    }
  }
}
