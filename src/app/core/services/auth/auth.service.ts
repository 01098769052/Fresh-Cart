import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../../shared/environment/env';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { BrowserPlatformService } from '../browserPlatform/browser-platform.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(){
    if(this.browserPlatformService.checkPlatform()){
      this.saveUserData();
    }
  }

  // Inject HttpClient Service , router service and BrowserPlatformService.
  http:HttpClient = inject(HttpClient);
  router:Router = inject(Router);
  browserPlatformService:BrowserPlatformService = inject(BrowserPlatformService);

  userData:BehaviorSubject<any> = new BehaviorSubject(null);

  // decode the user token and save the user data.
  saveUserData(){
    if(localStorage.getItem('userToken')!=null){
      this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));
    }
  }

  // methode to check if authorized user or not (used for cart and wishlist operation).
  checkAuthorizedUser():boolean{
    if(this.userData.getValue()!=null){
      return true;
    }
    return false;
  }

  // signUp Api Request.
  signUp(signUpForm:object):Observable<any>{
    return this.http.post(`${env.baseUrl}/api/v1/auth/signup`,signUpForm);
  }

  // login Api Request.
  logIn(logInForm:object):Observable<any>{
    return this.http.post(`${env.baseUrl}/api/v1/auth/signin`,logInForm);
  }

  // forget password Api Request.
  forgetPassword(email:object):Observable<any>{
    return this.http.post(`${env.baseUrl}/api/v1/auth/forgotPasswords`,email);
  }

  // verify reset code Api Request.
  verifyResetCode(resetCode:string):Observable<any>{
    return this.http.post(`${env.baseUrl}/api/v1/auth/verifyResetCode`,{resetCode:resetCode});
  }

  // reset password Api Request.
  resetPassword(resetInformation:object):Observable<any>{
    return this.http.put(`${env.baseUrl}/api/v1/auth/resetPassword`,resetInformation);
  }

  // logout method
  logOut():void{
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this.router.navigate(['/logIn']);
  }
}