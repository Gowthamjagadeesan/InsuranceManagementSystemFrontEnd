import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from './loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getCustomer="http://localhost:9090/customer/searchById/"
  getAgent="http://localhost:9090/agent/searchById/"
  nofi="http://localhost:1119/notify/get/";
  delete="http://localhost:1119/notify/deleteById/";
  notificationCount:number;
  constructor(private router:Router,private client :HttpClient,private loginService:LoginserviceService) { 
    // Check if user is logged in
    if(localStorage.getItem("username") && localStorage.getItem("password")){
      this.isLogedIn=true;
    }
    else{
      this.isLogedIn=false;
    }
    this.loadNoti(sessionStorage.getItem("custId")).subscribe(data => {
      this.notificationCount = data.length;
      // this.commonService.notificationCount = data.length;
 
      // localStorage.setItem('lastSeenNotificationCount', data.length.toString());
 
    });
  }
  public isLogedIn = false;
  // validate(form):boolean{
  //   console.log("logged In",form.value.userName);
  //   console.log("logged In",form.value.password);
  //   var un:string=localStorage.getItem("username")
  //   var pwd:string=localStorage.getItem("password")
  //   console.log(un)
  //   console.log(form.value.userName)
  //   console.log(pwd)
  //   console.log(form.value.password)
    
  //   if(form.value.userName == un && form.value.password == pwd){
  //     this.isLogedIn=true;
  //     this.router.navigate(["/insurance"])
  //     return this.isLogedIn
      
  //   }
  // }

  deleteNoti(id:any){
    return this.client.delete(this.delete+id,{responseType: 'text'});
  }
  loadNoti(id:any){
    return this.client.get<Notification[]>(this.nofi+id);
  }

  getCustomerById(id:any){
    return this.client.get<Customer>(this.getCustomer+id);
  }
  getAgentById(id:any){
    return this.client.get<Agent>(this.getAgent+id);
  }

  get isLoggedIn(): boolean{
    if(this.loginService.getJWT()){
      return true;
    }
    else{
      return this.loginService.logStatus();
    }
  }
  

  getLoginStatus():boolean{
    return this.isLogedIn;
  }
  onSubmit(form) : void{
      localStorage.setItem("username",form.get("name").value);
      localStorage.setItem("password",form.get("password").value);
      this.router.navigate(["/login"]);
    }
    logout():boolean{
    
      alert("logout successful")
      this.router.navigate(["/login"])
      localStorage.clear()
      this.isLogedIn=false;
      return this.isLogedIn
    }
    
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
  
  export class Notification {
    notificationId: number;
    customerId: number;
    policyId: number;
    message: string;
    customerMail: string;
    phoneNumber: number;
  }


