import { Component } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policies',
  imports: [CommonModule,FormsModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent {
  policies:Policy[] 
  selectedPolicy:any;
  constructor(private polService:PolicyService,private router:Router){
    polService.getAll().subscribe(
      {
        next: (response) =>{
          console.log(response);
          this.policies = response;
        }
      }
    );
  }
  openDetails(policy){
    this.selectedPolicy=policy
  }
  update(policy:Policy){
    this.polService.updatePol(policy).subscribe(
      {
        next: (response) =>{
          console.log(response);
        }
      }
    )
  }
}
export class Policy{
  policyId:number;
  policyName:string;
  premiumAmount:number;
  coverageDetails:string;
  validityPeriod:Date;
}
