import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,AlertComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy{
  // Inject AuthService , ToastrService and Router service.
  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);
  toastrService:ToastrService = inject(ToastrService);

  inputDisplay:number = 0;
  loadingSpinner:boolean = false;
  subscription:Subscription = new Subscription();  

  // forget password form.
  forgetPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });

  // reset code form.
  resetCodeForm:FormGroup = new FormGroup({
    num1:new FormControl(null,[Validators.required,Validators.pattern(/^\d{1}$/)]),
    num2:new FormControl(null,[Validators.required,Validators.pattern(/^\d{1}$/)]),
    num3:new FormControl(null,[Validators.required,Validators.pattern(/^\d{1}$/)]),
    num4:new FormControl(null,[Validators.required,Validators.pattern(/^\d{1}$/)]),
    num5:new FormControl(null,[Validators.required,Validators.pattern(/^\d{1}$/)]),
    num6:new FormControl(null,[Validators.required,Validators.pattern(/^\d{1}$/)]),
  });

  // reset password form.
  resetPasswordForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      newPassword : new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)])
  });

  //Handling error response.
  errorResponse(message:string){
    this.loadingSpinner = false;
    this.toastrService.error(`${message} !`,`Authentication`);    
  }

  // forgetPassword method.
  forgetPassword(){
    if(this.forgetPasswordForm.valid){
      this.loadingSpinner = true;
      const forgetPasswordSub = this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next:(res)=>{
          this.inputDisplay = 1;
          this.loadingSpinner = false;
          this.resetPasswordForm.get('email')?.patchValue(this.forgetPasswordForm.get('email')?.value);
        },
        error:(err)=>{
          this.errorResponse(err.error.message);
          this.router.navigate([`/signUp`]);
        }
      });
      this.subscription.add(forgetPasswordSub);
    }
  }
  
  // resetCode method.
  resetCode(){
    if(this.resetCodeForm.valid){
      this.loadingSpinner = true;
      const resetCodeSub = this.authService.verifyResetCode(`${this.resetCodeForm.get('num1')?.value}${this.resetCodeForm.get('num2')?.value}${this.resetCodeForm.get('num3')?.value}${this.resetCodeForm.get('num4')?.value}${this.resetCodeForm.get('num5')?.value}${this.resetCodeForm.get('num6')?.value}`).subscribe({
        next:(res)=>{
          this.loadingSpinner = false;
          this.inputDisplay = 2;
        },
        error:(err)=>{
          this.errorResponse(err.error.message);
        }
      });
      this.subscription.add(resetCodeSub);
    }
  }

  // resetPassword method.
  resetPassword(){
      if(this.resetPasswordForm.valid){
        this.loadingSpinner = true;
        const resetPasswordSub = this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
          next:(res)=>{
            this.loadingSpinner = false;
            this.toastrService.success(`Now you have a new password , LogIn Now`,`Authentication`);
            this.router.navigate([`/logIn`]);
          },
          error:(err)=>{
            this.errorResponse(err.error.message);
          }
        });
        this.subscription.add(resetPasswordSub);
      }
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
