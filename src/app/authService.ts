
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth ({
    clientID : '<APPLICATION_CLIENT_ID>'  ,
    domain: '<YOUR_AUTH0_DOMAIN>',
    responseType: 'token',
    redirectUri: 'http://localhost:4200/',
    scope: 'openid'
   });

   accessToken:string;
   expiresAt:Number;

   constructor(public router:Router) {}

   public login() {
     this.auth0.authorize();
   }
   public handleAuthentication() {
     this.auth0.parseHash((err,authResult)=>{
          if(authResult && authResult.accessToken) {
            window.location.hash = '';
            this.accessToken = authResult.accessToken;
            this.expiresAt =(authResult.expiresIn*1000) + new Date().getTime();
            this.router.navigate(['/dashborad']);
          } else if (err) {
            this.router.navigate(['/']);
            console.log(err);
          }
     });
   }

    public logout() {
      this.accessToken = null;
      this.expiresAt = null ;
      this.router.navigate(['/']);
    }


    public isAuthenticated() {
      return new Date().getTime() < this.expiresAt ;
    }
  }

