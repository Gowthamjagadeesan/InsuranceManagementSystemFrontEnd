import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonService } from '../common.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginserviceService } from '../loginservice.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { ListcustomerService } from '../listcustomer.service';

@Component({
  selector: 'header',
  imports: [RouterLink,RouterOutlet,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  get isCustomer(): boolean {
    if (sessionStorage.getItem('role')!= 'Customer') {
      return false;
    }
    return true;
  }
  get isAdmin(){
    if(sessionStorage.getItem('role')!= 'admin'){
      return false;
    }
    return true;
  }
  token: string;
  //isLogedIn:boolean = false
  // isCustomer:boolean = false;
  role:string
  selectedCustomer: Customer;
  selectedAgent: Agent;
  notifications:Notification[];

  constructor(private router:Router,private listCust:ListcustomerService,private commonService:CommonService, private loginService:LoginserviceService,private cdr: ChangeDetectorRef){
   console.log("HeaderComponent initialized");
      if(localStorage.getItem("token")){
        const token = localStorage.getItem("token");
            const decoded = jwtDecode<JwtPayload>(token);
            this.role = decoded.roles ?? 'No role found';
             console.log(this.role);

      }
          
  }
  get notificationCount(): number {
    //    this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe(data => {
    //    this.commonService.notificationCount = data.length;
    //  });
 
    return this.commonService.notificationCount;
  }
    loadUser(){
    if(sessionStorage.getItem("role") == "Customer"){
      this.commonService.getCustomerById(sessionStorage.getItem("custId")).subscribe({
        next:(response)=>{
          console.log(response);
          this.selectedCustomer = response;
          console.log(this.selectedCustomer);
          
          
        }
      }
      )
    }
    else if(sessionStorage.getItem("role") == "agent"){
      this.commonService.getAgentById(sessionStorage.getItem("agentId")).subscribe({
        next:(response)=>{
          console.log(response);
          this.selectedAgent = response;
          console.log(this.selectedAgent);
        }
      }
      )
    }
  }

  // loadUser() {
  //   if (sessionStorage.getItem("role") == "Customer") {
  //     this.commonService.getCustomerById(sessionStorage.getItem("custId")).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         this.selectedCustomer = response;
  //         console.log(this.selectedCustomer);
  
  //         // Dynamically load notifications for the customer
  //         this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe({
  //           next: (data) => {
  //             this.commonService.notificationCount = data.length;
  //             console.log("Notification count updated:", this.commonService.notificationCount);
  //             this.cdr.detectChanges();
  //           },
  //           error: (err) => {
  //             console.error("Failed to load notifications:", err);
  //           }
  //         });
  //       },
  //       error: (err) => {
  //         console.error("Failed to load customer:", err);
  //       }
  //     });
  //   } else if (sessionStorage.getItem("role") == "agent") {
  //     this.commonService.getAgentById(sessionStorage.getItem("agentId")).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         this.selectedAgent = response;
  //         console.log(this.selectedAgent);
  //       },
  //       error: (err) => {
  //         console.error("Failed to load agent:", err);
  //       }
  //     });
  //   }
  // }
  get isLogedIn(): boolean{
    if(this.loginService.getJWT()){
      return true;
    }
    else{
      return this.loginService.logStatus();
    }
  }

  update(customer: Customer) {
      if (this.selectedCustomer) {
        console.log(this.selectedCustomer.customerId)
        customer.customerId = this.selectedCustomer.customerId
        this.listCust.updateCust(customer).subscribe(
          {
            next: (response => console.log(response))
          }
        )
        window.location.reload();
      }
    }
  logout(){
    this.loginService.logout();
    // this.isLogedIn = false;
    // alert("logged out successfully")
    this.router.navigate(["/home"])
   }

   
  // get isLogedIn(): boolean{
  //   return this.commonService.getLoginStatus();
  // }
  
}
interface JwtPayload {
  roles?: string;
  // Add other fields if needed
}


export class Customer {
  customerId: number;
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies:Policy[];

}

export class Agent {
  agentId: number;
  name: string;
  email: string;
  policies:Policy[];
}

export class Policy{
  policyId: number;
  policyType:string;
}
// letisCustomer = false;





