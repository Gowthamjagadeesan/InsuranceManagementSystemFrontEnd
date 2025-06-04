import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyclaimService {

  constructor(private client: HttpClient) { }
  getCustClaim="http://localhost:9090/claim/findByCustId/";
  delete="http://localhost:9090/claim/deleteById/";
  getClaimByCustId(){
    let custId = sessionStorage.getItem("custId");
    if(custId){
      return this.client.get<Claim[]>(this.getCustClaim + custId);
    } else {
      return null;
    }
  }
  deleteClaim(claimId: number) {
    return this.client.delete(this.delete + claimId, { responseType: 'text' });
  }
}
export class Claim {
  claimId: number;
  customerId: number;
  policyId: number;
  agentId: number;
  customerMail: string;
  claimAmount: number;
  claimStatus: string;
}

