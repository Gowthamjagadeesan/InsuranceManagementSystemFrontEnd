import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { ListcustomerService } from '../listcustomer.service';

@Component({
  selector: 'customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers: Customer[];
  selectedCustomer : Customer | null = null;
  constructor(private listCust:ListcustomerService){
    listCust.getALlCustomer().subscribe(response => console.log(response));
    listCust.getALlCustomer().subscribe(response => this.customers=response);
  }
  delete(customer:Customer){

    

    let confirmation= confirm("Do you want to delete the Customer")
    if(confirmation){
      let index = this.customers.indexOf(customer);
      console.log("Index :", index);
      this.customers.splice(this.customers.indexOf(customer),1);
      alert("Deleted successfully")
  }
}
}

export class Customer {
  customerId: number;
  name: string;
  email: string;
  customerPhone: string;
  customerAddress: string;
  policies:Policy[];

  constructor(cid: number, name: string, email: string, phone: string, address: string, policies: Policy[]) {
    this.customerId = cid;
    this.name = name;
    this.email = email;
    this.customerPhone = phone;
    this.customerAddress = address;
    this.policies = policies
  }
}
export class Policy{
  policyId: number;
  policyName:string;
}