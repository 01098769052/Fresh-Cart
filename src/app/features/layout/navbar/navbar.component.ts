import { BrowserPlatformService } from './../../../core/services/browserPlatform/browser-platform.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { AfterContentInit, AfterViewInit, Component,ElementRef,HostListener,inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavDirective } from '../../../shared/directive/nav/nav.directive';
import { CartService } from '../../../core/services/e-comme/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,NavDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit,AfterViewInit,OnDestroy{
  // Inject AuthService , CartService and Renderer2
  authService:AuthService = inject(AuthService);
  cartService:CartService = inject(CartService);
  browserPlatformService:BrowserPlatformService = inject(BrowserPlatformService);
  renderer2:Renderer2 = inject(Renderer2);

  @ViewChildren('navMenu') navMenu!:QueryList<any>;
  @ViewChild('accountMenu') accountMenu!:ElementRef;
  @ViewChild('languagesMenu') languagesMenu!:ElementRef;
  @ViewChild('lightiningToggle') lightiningToggle!:ElementRef;
  isLogin!:boolean;
  cartCount!:number;
  subscription:Subscription = new Subscription();

  // dropDownNavbar method (manipulate DOM by usin renderer2)
  dropDownNavbar(){
    this.navMenu.forEach((el:ElementRef)=>{
      if(el.nativeElement.classList.contains('hidden')){
        this.renderer2.removeClass(el.nativeElement,'hidden')
        this.renderer2.addClass(el.nativeElement,'flex')
      }
      else{
        this.renderer2.removeClass(el.nativeElement,'flex')
        this.renderer2.addClass(el.nativeElement,'hidden')
      }
    });
  }

  // dropDownAccount method (manipulate DOM by usin renderer2)
  dropDownAccount(){
    if(this.accountMenu.nativeElement.classList.contains('hidden')){
      this.renderer2.removeClass( this.accountMenu.nativeElement,'hidden')
      this.renderer2.addClass( this.accountMenu.nativeElement,'flex')
      this.renderer2.removeClass( this.languagesMenu.nativeElement,'flex')
      this.renderer2.addClass( this.languagesMenu.nativeElement,'hidden')
    }
    else{
      this.renderer2.removeClass( this.accountMenu.nativeElement,'flex')
      this.renderer2.addClass( this.accountMenu.nativeElement,'hidden')
    }
  }

  // dropDownLanguages method (manipulate DOM by usin renderer2)
  dropDownLanguages(){
    if(this.languagesMenu.nativeElement.classList.contains('hidden')){
      this.renderer2.removeClass( this.languagesMenu.nativeElement,'hidden')
      this.renderer2.addClass( this.languagesMenu.nativeElement,'flex')
      this.renderer2.removeClass( this.accountMenu.nativeElement,'flex')
      this.renderer2.addClass( this.accountMenu.nativeElement,'hidden')
    }
    else{
      this.renderer2.removeClass( this.languagesMenu.nativeElement,'flex')
      this.renderer2.addClass( this.languagesMenu.nativeElement,'hidden')
    }
  }

  // change lightiningMode.
  lightiningMode(){
    if(this.browserPlatformService.checkPlatform()){
      if(document.body.classList.contains('dark')){
        this.renderer2.removeClass(document.body,'dark');
        this.renderer2.removeClass(this.lightiningToggle.nativeElement,'fa-lightbulb');
        this.renderer2.addClass(this.lightiningToggle.nativeElement,'fa-moon');
        localStorage.setItem('LightiningMode','');
      }
      else{
        this.renderer2.addClass(document.body,'dark');
        this.renderer2.removeClass(this.lightiningToggle.nativeElement,'fa-moon');
        this.renderer2.addClass(this.lightiningToggle.nativeElement,'fa-lightbulb');
        localStorage.setItem('LightiningMode','dark');
      }
    }
  }

  // check the user lightiningMode from local storage.
  checkLightiningMode(){
    if(this.browserPlatformService.checkPlatform()){
      if(localStorage.getItem('LightiningMode')!=null){
        this.renderer2.addClass( document.body,localStorage.getItem('LightiningMode')!)
        if(localStorage.getItem('LightiningMode')==='dark'){
          this.renderer2.removeClass(this.lightiningToggle.nativeElement,'fa-moon');
          this.renderer2.addClass(this.lightiningToggle.nativeElement,'fa-lightbulb');
        }
      }
      else{
        localStorage.setItem('LightiningMode','');
      }
    }
  }

  // methode to check if the user is logged or not.
  checkUserLogged(){
    const userDataSub = this.authService.userData.subscribe(()=>{
      if(this.authService.userData.getValue() == null){
        this.isLogin = false;
      }
      else{
        this.isLogin = true;
        this.getCartCount();
      }
    });
    this.subscription.add(userDataSub);
  }

  // methode to get the number of user cart items.
  getCartCount(){
    const cartCountSub = this.cartService.getUserCartCount().subscribe((res)=>{
      this.cartService.userCartCount.next(res);
      this.cartService.userCartCount.subscribe(()=>this.cartCount = this.cartService.userCartCount.getValue())
    })
    this.subscription.add(cartCountSub)
  }

  ngOnInit(): void {
    this.checkUserLogged();
  }

  ngAfterViewInit(): void {
    this.checkLightiningMode();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
