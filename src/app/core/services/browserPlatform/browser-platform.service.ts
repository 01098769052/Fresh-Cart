import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserPlatformService {
  // service for check platform.
  constructor(@Inject(PLATFORM_ID) private platformId:object) { }
  checkPlatform():boolean{
    if(isPlatformBrowser(this.platformId)){
      return true;
    }
    return false;
  }
}
