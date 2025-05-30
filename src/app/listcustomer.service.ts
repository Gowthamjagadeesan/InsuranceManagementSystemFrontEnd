import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListcustomerService {
  path="http://localhost:9090/customer/getAllCustomers";
  form:Customer[];
  constructor(private client : HttpClient) { 
   
  }
  getALlCustomer(){
    // const token = localStorage.getItem("token");
    // const headers = new HttpHeaders({
    //   'Authorization' : `Bearer ${token}`,
    //   'Content-Type' : `application/json`
    // })
    // console.log("Registering user:", this.form);
    // return this.client.get<Customer[]>(this.path,{headers});
    return this.client.get<Customer[]>(this.path);
  }
}
export class Customer {
  customerId: number;
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies:Policy[];

  // constructor(cid: number, name: string, email: string, phone: string, address: string, policies: Policy[]) {
  //   this.cid = cid;
  //   this.name = name;
  //   this.email = email;
  //   this.phone = phone;
  //   this.address = address;
  //   this.policies = policies
  // }
}
export class Policy{
  policyId: number;
  policyName:string;
}