import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ListcustomerService {
  path="http://localhost:9090/customer/getAllCustomers";
  path1="http://localhost:9090/customer/getPolicyByCustomer/"
  path2="http://localhost:9090/customer/delete/"
  save="http://localhost:9090/customer/create"
  update="http://localhost:9090/customer/update"
  form:Customer[];
  constructor(private client : HttpClient) { 
   
  }
  updateCust(custForm:Customer) {
    return this.client.put(this.update,custForm);
  }
  saveCust(custForm: Customer1){
    return this.client.post(this.save,custForm,{responseType:'text'});
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
  deleteCust(custId){
    console.log(custId);
    return this.client.delete(this.path2+custId);
  }
  getPolicy(custId:number){
    console.log(custId)
    return this.client.get<Policy[]>(this.path1+custId)
  }
}
export class Customer1 {

  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies:Policy[];

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
  policyType:string;
}