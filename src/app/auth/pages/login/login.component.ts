import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private router: Router, private authServie: AuthService) { }

  login() {

    this.authServie.login().subscribe(resp => {
      if (resp.id) {
        this.router.navigate(['./heroes']);
      }
    });

  }

  Nologin(){
    this.authServie.logOut();
    this.router.navigate(['./heroes']);
  }

}
