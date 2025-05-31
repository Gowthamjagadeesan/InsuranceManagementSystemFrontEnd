import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  all="http://localhost:9090/policy/retrieveAll"
  update = "http://localhost:9090/policy/update"

  constructor(private client:HttpClient) { 

  }
  getAll(){
   return this.client.get<Policy[]>(this.all);
  }

  updatePol(policy){
    return this.client.put<Policy>(this.update,policy);
  }

}
export class Policy{
  policyId:number;
  policyName:string;
  premiumAmount:number;
  coverageDetails:string;
  validityPeriod:Date;
}
