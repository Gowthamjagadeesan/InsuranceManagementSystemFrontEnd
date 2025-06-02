import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ListcustomerService } from '../listcustomer.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../policy.service';
import { CLaimService } from '../claim.service';

@Component({
  selector: 'customer',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  policies: Policy[];
  policies1: Policy1[];
  customers: Customer[];
  selectedPol: Policy | null = null;
  filteredCustomers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  selectedPolicy: Policy1 | null = null;
  agent: Agent | null = null;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  claimStatus = "FILLED";

  constructor(private listCust: ListcustomerService, private polService: PolicyService, private claimService: CLaimService) {
    listCust.getALlCustomer().subscribe(response => console.log(response));
    listCust.getALlCustomer().subscribe(response => this.customers = response);
    polService.getAll().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.policies1 = response;
        }
      }
    );


  }
  ngOnInit(): void {

    this.listCust.getALlCustomer().subscribe(response => {
      this.customers = response;
      this.filteredCustomers = [...this.customers]; // initialize filtered list
    });

  }

  assign(custAssign) {
    console.log(custAssign)
    console.log(this.selectedCustomer.customerId)
  }

  createClaim(policy: Policy) {
    console.log(this.selectedCustomer.customerId);
    this.selectedPol = policy;
    console.log(policy.policyId);
    this.listCust.getAgentByPol(policy.policyId).subscribe({
      next: (response => {
        this.agent = response
        console.log(this.agent);
        console.log(this.agent.agentId);
      })
    })


  }

  loadPolicies(customer: Customer) {
    this.selectedCustomer = customer;
    this.listCust.getPolicy(customer.customerId).subscribe(
      {
        next: (response) => {
          this.policies = response;
          console.log(this.policies)
        }
      }
    )

  }
  edit(customer: Customer) {
    this.selectedCustomer = { ...customer };
  }
  editPol(policy: any) {
    this.selectedPolicy = { ...policy };
    console.log(this.selectedPolicy);
    console.log(this.selectedCustomer);
    this.polService.assignToCustomer(this.selectedPolicy.policyId, this.selectedCustomer.customerId, this.selectedPolicy.policyName).subscribe(
      {
        next: (response) => {
          console.log(response)
        }
      }
    )
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
  update(customer: Customer) {
    if (this.selectedCustomer) {
      console.log(this.selectedCustomer.customerId)
      customer.customerId = this.selectedCustomer.customerId
      this.listCust.updateCust(customer).subscribe(
        {
          next: (response => console.log(response))
        }
      )
    }
  }
  add(custForm: NgForm) {

    const customerData = custForm.value; // This is of type Customer1
    console.log(customerData);

    this.listCust.saveCust(customerData).subscribe(
      {
        next: (response => console.log(response))
      }
    )
    window.location.reload();
  }
  delete(customer: Customer) {



    let confirmation = confirm("Do you want to delete the Customer")
    if (confirmation) {
      this.selectedCustomer = customer;
      this.listCust.deleteCust(customer.customerId).subscribe(
        {
          next: (response) => {
            console.log(response)
          }
        }
      )
      window.location.reload();

      alert("Deleted successfully")
    }
  }

  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  paginatedCustomers(): Customer[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  trackByCustomerId(index: number, customer: Customer): number {
    return customer.customerId;
  }

}


export class Customer1 {
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies: Policy[];
}

export class Customer {
  customerId: number;
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies: Policy[];

  constructor(cid: number, name: string, email: string, phone: string, address: string, policies: Policy[]) {
    this.customerId = cid;
    this.name = name;
    this.email = email;
    this.customerPhone = phone;
    this.customerAddress = address;
    this.policies = policies
  }
}

export class Agent {
  agentId: number;
  name: string;
  email: string;
  policies: AgePolicy[];
}

export class Policy {
  policyId: number;
  policyType: string;
}
export class AgePolicy {
  policyId: number;
  policyType: string;
}

export class Policy1 {
  policyId: number;
  policyName: string;
  premiumAmount: number;
  coverageDetails: string;
  validityPeriod: Date;
}

export class Claim {
  customerId: number;
  policyId: number;
  agentId: number;
  customerMail:string;
  claimAmount: number;
  claimStatus: string;
}