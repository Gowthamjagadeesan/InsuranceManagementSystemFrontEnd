import { Component } from '@angular/core';
import { ListcustomerService } from '../listcustomer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CLaimService } from '../claim.service';

@Component({
  selector: 'app-mypolicy',
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './mypolicy.component.html',
  styleUrl: './mypolicy.component.css'
})
export class MypolicyComponent {
  policies:Policy[] 
  agent: Agent | null = null;
  selectedPol: Policy | null = null;
  customerId: any | null = null;
  claimStatus = "FILLED";
  constructor(private customerService: ListcustomerService, private listCust:ListcustomerService,private claimService:CLaimService) {
    // This service should be injected to fetch customer data
    const custId = sessionStorage.getItem("custId")
    console.log("Customer ID from session storage:", custId);
     customerService.getPolicy(custId).subscribe({
        next: (response) => {
          console.log("Policies fetched successfully:", response);
          this.policies = response;
        }
     });
  } 
  create(claim: Claim) {
      console.log(claim);
      claim.claimStatus="FILLED"
      this.claimService.createClaim(claim).subscribe({
        next: (response) =>{
          console.log(response)
        }
      })
  
    }
  createClaim(policy: Policy) {
      //console.log(this.selectedCustomer.customerId);
      this.selectedPol = policy;
      this.customerId= sessionStorage.getItem("custId");
      console.log(policy.policyId);
      this.listCust.getAgentByPol(policy.policyId).subscribe({
        next: (response => {
          this.agent = response
          console.log(this.agent);
          console.log(this.agent.agentId);
        })
      })
  
  
    }

}
export class Policy{
  policyId: number;
  policyType:string;
}
export class Policy1{
  policyId: number;
  policyType:string;
}
export class Customer {
  customerId: number;
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies: Policy1[];

  constructor(cid: number, name: string, email: string, phone: string, address: string, policies: Policy[]) {
    this.customerId = cid;
    this.name = name;
    this.email = email;
    this.customerPhone = phone;
    this.customerAddress = address;
    this.policies = policies
  }
}
export class Claim {
  customerId: number;
  policyId: number;
  agentId: number;
  customerMail:string;
  claimAmount: number;
  claimStatus: string;
}
export class Agent {
  agentId: number;
  name: string;
  email: string;
  policies: AgePolicy[];
}
export class AgePolicy {
  policyId: number;
  policyType: string;
}

