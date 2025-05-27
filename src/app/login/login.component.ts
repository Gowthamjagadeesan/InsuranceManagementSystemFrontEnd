import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'login',
  imports: [RouterLink,RouterOutlet,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  constructor(private router:Router,private commonService:CommonService){
    
  }
  validated(form){
    console.log("validate function calling.......") ;
    // console.log(this.commonService.isLogedIn) ;
    console.log(this.commonService.validate(form));
  }
  login(){
    console.log(this.commonService.isLogedIn) ;
   }
  
  

}
