import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./features/layout/navbar/navbar.component";
import { FooterComponent } from "./features/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'E-commerce';
  //Flowbite Initilization methode.
  flowbite(){
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }
  constructor(private readonly flowbiteService:FlowbiteService){}
  ngOnInit(): void {
    this.flowbite();
  }
}
