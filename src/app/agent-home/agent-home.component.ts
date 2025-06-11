import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'agent-home',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './agent-home.component.html',
  styleUrl: './agent-home.component.css'
})
export class AgentHomeComponent {
  constructor(private route:Router){

   
  }
  role = sessionStorage.getItem("role");
  username = sessionStorage.getItem("username");
  openCust(){
    this.route.navigate(["/cust-op"])
  }
  openPolicy(){
    this.route.navigate(['/policy-op'])
  }
  openClaim(){
    this.route.navigate(['/claim'])
  }
  openAgent(){
    this.route.navigate(['/agent'])
  }
 
}
