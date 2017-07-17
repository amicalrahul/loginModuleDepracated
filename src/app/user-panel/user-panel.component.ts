import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  @Input() loginAfterRegister;
  @Input() userLabel;
  @Input() showLogout;
  @Output() postRegister = new EventEmitter();
  @Output() postLogin = new EventEmitter();
  private loginMode = 'login'; // login, register
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  changeLoginMode(e, mode) {
    e.preventDefault();
    e.stopPropagation();
    this.loginMode = mode;
  }

  logout() {
      this.authenticationService.logout();
  }

getAccessToken(): boolean {
  if (this.authenticationService.getAccessToken() === '') {
    return false;
  } else {
  return true;
  }
  }
}
