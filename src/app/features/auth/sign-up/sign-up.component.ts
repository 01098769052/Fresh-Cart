import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, OnDestroy} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AlertComponent } from "../../../shared/components/alert/alert.component";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnDestroy{
  // Inject AuthService and Router.
  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);
  
  loading:boolean = false;
  errorMessage!:string;
  subscription:Subscription = new Subscription();

  // signUpform.
  signUpForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.pattern(/^(?![_ -])[A-Za-z]{3,29}(?:[ _-][A-Za-z]{1,29})*(?![_ -])$/)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  },this.confirmPassword);

  // Custom Validation (compare between password and repassword)
  confirmPassword(control:AbstractControl){
    if(control.get('password')?.value===control.get('rePassword')?.value){
      return null;
    }
    else{
      return {'mismatched':true};
    }
  }

  // signUp function.
  signUp(){
    if(this.signUpForm.valid){
      this.loading = true;
      const submitSub = this.authService.signUp(this.signUpForm.value).subscribe({
        next:(res)=>{
          if(res.message==='success'){
            this.router.navigate(['/logIn']);
          }
          this.loading = false;
        },
        error:(err)=>{
          this.errorMessage = err.error.message;
          this.loading = false;
        }
      });
      this.subscription.add(submitSub);
    }
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
