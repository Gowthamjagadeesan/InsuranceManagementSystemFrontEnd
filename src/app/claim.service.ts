import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CLaimService {

  constructor(private client:HttpClient) { }
  
  create="http://localhost:9090/claim/file";
  getAll="http://localhost:9090/claim/retrieveAll";
  amount="http://localhost:9090/claim/reviewClaimByAmount/";
  validityperiod="http://localhost:9090/claim/reviewClaimByValidityPeriod/";
  update="http://localhost:9090/claim/updateClaim";

  createClaim(claim:Claim1){
    return this.client.post(this.create,claim,{responseType:'text'});
  }
  getAllClaim(){
    return this.client.get<Claim[]>(this.getAll);
  }
  reviewByAmount(claimId){
    return this.client.put<Claim>(this.amount+claimId,{});
  }
  reviewByValidityPeriod(claimId){
    return this.client.put<Claim>(this.validityperiod+claimId,{});
  }
  updateCLaim(claim){
    return this.client.put<Claim>(this.update,claim);
  }
}
export class Claim{
  claimId:number
  customerId:number;
  policyId:number;
  agentId:number;
  customerMail:string;
  claimAmount:number;
  claimStatus:string;
}

export class Claim1{
  customerId:number;
  policyId:number;
  agentId:number;
  customerMail:string;
  claimAmount:number;
  claimStatus:string;
}
