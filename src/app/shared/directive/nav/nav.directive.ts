import { Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';

@Directive({
  selector: '[appNav]'
})
export class NavDirective{
  // Directive for manipulate the navbar element
  
  // Inject the navbar tag DOM in this directive and Renderer2 service to (set/remove) classes based on condition.
  navbar:ElementRef = inject(ElementRef);
  renderer2:Renderer2 = inject(Renderer2);
  @HostListener('window:scroll') onScroll(){
    if(scrollY>0){
      this.renderer2.addClass(this.navbar.nativeElement,'py-7')
    }
    else{
      this.renderer2.removeClass(this.navbar.nativeElement,'py-7')
    }
  }
}
