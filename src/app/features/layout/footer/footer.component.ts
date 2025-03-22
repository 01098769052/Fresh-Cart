import { Component } from '@angular/core';
import { ExternalAnchorDirective } from '../../../shared/directive/externalAnchor/external-anchor.directive';

@Component({
  selector: 'app-footer',
  imports: [ExternalAnchorDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
