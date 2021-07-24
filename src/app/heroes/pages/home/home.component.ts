import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/inteface/auth.intefase';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin:10px;
    }
  `]
})
export class HomeComponent  {

  constructor(private router:Router, private authService:AuthService) { }

  get auth():Auth{
    return this.authService.auth;
  }

  logout(){
    this.router.navigate(['./auth/login'])
  }

}
