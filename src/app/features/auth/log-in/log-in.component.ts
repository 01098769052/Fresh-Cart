import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule , FormGroup , FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,AlertComponent,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnDestroy{
  // Inject AuthService and router
  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);

  loading:boolean=false;
  errorMessage!:string;
  subscription:Subscription = new Subscription();

  // LogInform.
  logInForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)])
  });

  // logIn function.
  logIn(){
    if(this.logInForm.valid){
      this.loading = true;
      const logInSub = this.authService.logIn(this.logInForm.value).subscribe({
        next:(res)=>{
          if(res.message==='success'){
            localStorage.setItem('userToken',res.token);
            this.authService.saveUserData();
            this.router.navigate(['/home']);
          }
          this.loading = false;
        },
        error:(err)=>{
          this.errorMessage = err.error.message; 
          this.loading = false;
        }
      });
      this.subscription.add(logInSub)
    }
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
