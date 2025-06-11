import { Component } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policies',
  imports: [CommonModule, FormsModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent {
  today: string;
  custId: number;
  policies: Policy[]
  selectedPolicy: any;
  constructor(private polService: PolicyService, private router: Router) {

    const now = new Date();
    this.today = now.toISOString().split('T')[0];

    console.log(this.role);
    polService.getAll().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.policies = response;
        }
      }
    );
  }
  role = sessionStorage.getItem("role");

  openDetails(policy) {
    this.selectedPolicy = policy
  }
  update(policy: Policy) {
    this.polService.updatePol(policy).subscribe(
      {
        next: (response) => {
          console.log(response);
        }
      }
    )
  }
  getCustomerByName() {

    this.polService.getCustomerByName(sessionStorage.getItem("username")).subscribe(
      {

        next: (response) => {
          console.log("Customer response:", response);

          console.log("Customer ID:", response.customerId);
          sessionStorage.setItem("custId", response.customerId.toString());
        }
      }
    )

  }
  add(policy: Policy) {
    this.polService.addPolicy(policy).subscribe({
      next: (response) => {
        console.log(response);

      }
    })
    window.location.reload();
  }
  deletePolicy(policyId) {
    this.polService.deletePolicy(policyId).subscribe({
      next: (response) => {
        console.log("Policy deleted successfully:", response);
       
      }
    });
    window.location.reload();
  }
  enroll(policyId, polName) {

    console.log("Enrolling policy with ID:", policyId, "and policy name:", polName);


    let name = sessionStorage.getItem("username");
    this.getCustomerByName();

    console.log("Fetching customer by name:", name);
    console.log("Customer ID fetched:", this.custId);
    this.polService.assignToCustomer(policyId, sessionStorage.getItem("custId"), polName).subscribe(
      {
        next: (response) => {
          console.log(response);

        }
      }
    )
    sessionStorage.removeItem("custId");
  }
}
export class Policy {
  policyId: number;
  policyName: string;
  premiumAmount: number;
  coverageDetails: string;
  validityPeriod: Date;
}
