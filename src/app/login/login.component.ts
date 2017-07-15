import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() postLogin = new EventEmitter();
  @Input() showRememberMe: boolean;

  private loginForm: any = null;
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  ngOnInit() {
    if (!this.showRememberMe) {
      this.showRememberMe = false;
    }
  }
  login() {
    this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password)
    .subscribe(loginResponse => {
            this.postLogin.emit(loginResponse);
      });
  }
}
