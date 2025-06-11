import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { Header2Component } from './header2/header2.component';
import { LoginserviceService } from './loginservice.service';
import { NotificationService } from './notification.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,HomeComponent,RouterLink,Header2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'InsuranceManagementSystemFrontEnd';
  constructor(private commonService:CommonService ,private logClient:LoginserviceService){

  }
  ngOnInit(): void {
    // console.log("AppComponent initialized");
    // if (localStorage.getItem("role") === 'Customer') {
    //   this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe(data => {
    //     this.commonService.notificationCount = data.length;
    //   });
    // }
  }
  // isLogedIn:boolean = false
  // constructor(){
    // if(logClient.getJWT())
    //   {
    //  this.isLogedIn=true
    //   }
  // }
  get isLogedIn(): boolean{
    if(this.logClient.getJWT()){
      return true;
    }
    else{
      return this.logClient.logStatus();
    }
  }
}
