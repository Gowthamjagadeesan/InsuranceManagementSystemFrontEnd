import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { Header2Component } from './header2/header2.component';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,HomeComponent,RouterLink,Header2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InsuranceManagementSystemFrontEnd';

  isLogedIn:boolean = false
  constructor(private logClient:LoginserviceService){
    if(logClient.getJWT())
      {
     this.isLogedIn=true
      }
  }
  
}
