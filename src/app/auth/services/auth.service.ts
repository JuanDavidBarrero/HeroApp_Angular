import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of , Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Auth } from '../inteface/auth.intefase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth  | undefined;

  get auth():Auth {
    return { ...this._auth!}
  }

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
                    .pipe( tap( auth => this._auth = auth  ),
                            tap(auth => localStorage.setItem('id',auth.id) )
                          );
  }

  logOut(){
    this._auth = undefined;
  }


  verficaAutentificacion(): Observable<boolean> {

    if(!localStorage.getItem('id')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(map(auth => {
      this._auth = auth;
      return true})
      );

  }

}
