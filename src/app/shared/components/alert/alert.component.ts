import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  // Input alertType and alertMessage from parent comonent.
  @Input() alertType!:string;
  @Input() alertMessage!:string;
}
