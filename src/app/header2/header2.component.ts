import { Component } from '@angular/core';
import { LoginserviceService } from '../loginservice.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'header2',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
  
}
