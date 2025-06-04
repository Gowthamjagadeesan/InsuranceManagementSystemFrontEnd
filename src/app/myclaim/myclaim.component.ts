import { Component } from '@angular/core';
import { MyclaimService } from '../myclaim.service';
import { CommonModule } from '@angular/common';
import { CLaimService } from '../claim.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myclaim',
  imports: [CommonModule,FormsModule],
  templateUrl: './myclaim.component.html',
  styleUrl: './myclaim.component.css'
})
export class MyclaimComponent {
   selectedClaim :Claim | null = null;
  claims:Claim[]=[];
    constructor(private myClaimService: MyclaimService,private claimService: CLaimService) {
        myClaimService.getClaimByCustId().subscribe({
          next:(response) =>{
            this.claims = response;
            console.log(this.claims);
          }
        })
    }
    edit(claim){
      this.selectedClaim=claim;
    }
    update(claim){
      this.claimService.updateCLaim(claim).subscribe({
        next:(response) =>{
          console.log(response);
        }
      })
    }
    delete(claimId: number) {
      console.log('Deleting claim with ID:', claimId);
      this.myClaimService.deleteClaim(claimId).subscribe({
        next: (response) => {
          console.log(response);
          window.location.reload();
            }
          });
        
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

