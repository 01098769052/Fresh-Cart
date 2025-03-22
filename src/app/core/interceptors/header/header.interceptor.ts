import { HttpInterceptorFn } from '@angular/common/http';
import { BrowserPlatformService } from '../../services/browserPlatform/browser-platform.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let browserPlatformService:BrowserPlatformService = inject(BrowserPlatformService)
  let userToken:any;
  if(browserPlatformService.checkPlatform()){
    if(localStorage.getItem('userToken')){
      userToken = {token:localStorage.getItem('userToken')!}
      req = req.clone({setHeaders:userToken});
      return next(req);
    }
  }
  return next(req);
};