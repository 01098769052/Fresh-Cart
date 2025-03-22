import { CanActivateFn, Router } from '@angular/router';
import { BrowserPlatformService } from '../../services/browserPlatform/browser-platform.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  // Inject BrowserPlatformService and Router.
  let browserPlatformService:BrowserPlatformService = inject(BrowserPlatformService);
  let router:Router = inject(Router);
  
  if(browserPlatformService.checkPlatform()){
    // guard for check userToken.
    if(localStorage.getItem('userToken')!=null){
      return true;
    }
  }
  router.navigate(['/logIn']);
  return false;
};
