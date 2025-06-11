import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  all="http://localhost:9090/policy/retrieveAll"
  update = "http://localhost:9090/policy/update"
  assignCust="http://localhost:9090/policy/assignPoliciesToCustomer/"
  // getcustByName="http://localhost:9090/customer/searchByName/";
  add="http://localhost:9090/policy/save";
  delete="http://localhost:9090/policy/deletePolicy/";
  removePol="http://localhost:9090/customer/remove-policy/";
  constructor(private client:HttpClient) { 

  }
  getAll(){
   return this.client.get<Policy[]>(this.all);
  }
  addPolicy(policy:Policy){
    return this.client.post(this.add,policy,{responseType:'text'});
  }
  removePolicyFromCustomer(polId:any){
    return this.client.delete(`${this.removePol}${polId}`, { responseType: 'text' });
  }

  updatePol(policy){
    return this.client.put<Policy>(this.update,policy);
  }
  assignToCustomer(polId,custId,polName){
    console.log(`from policy service...........${this.assignCust}${polId}/${custId}/${polName}`)
    return this.client.put<Customer>(`${this.assignCust}${polId}/${custId}/${polName}`, {});
  }
  getCustomerByName(name: string) {
    // console.log(`http://localhost:9090/customer/searchByName/${name}`);
    return this.client.get<Customer>(`http://localhost:9090/customer/searchByName/${name}`);
  }
  deletePolicy(policyId: number) {
    console.log(`Deleting policy with ID: ${policyId}`);
    return this.client.delete(`${this.delete}${policyId}`, { responseType: 'text' });
  }
}
export class Policy{
  policyId:number;
  policyName:string;
  premiumAmount:number;
  coverageDetails:string;
  validityPeriod:Date;
}
export class Customer {
  customerId: number;
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies: Policy1[];
  }

export class Policy1 {
  policyId: number;
  policyType: string;
}
