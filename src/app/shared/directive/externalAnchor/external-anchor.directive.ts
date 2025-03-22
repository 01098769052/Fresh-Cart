import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appExternalAnchor]'
})
export class ExternalAnchorDirective {
  // Directive for confirmation navigation to external anchor
  
  // Inject the anchor tag DOM in this directive.
  anchor:ElementRef = inject(ElementRef);
  @HostListener('click',['$event']) onClick(event:PointerEvent){
    let confirmationMessage = window.confirm('Are you sure to leave !');
    if(!confirmationMessage){
      event.preventDefault();
    }
  }
}
