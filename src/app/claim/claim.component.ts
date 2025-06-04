import { Component } from '@angular/core';
import { CLaimService } from '../claim.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'claim',
  imports: [CommonModule,FormsModule],
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css'
})
export class CLaimComponent {
  claims: Claim[];
  selectedClaim :Claim | null = null;

  filteredClaims: any[] = []; // Claims after search
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchClaimId: string = '';


  constructor(private claimService: CLaimService) {
    claimService.getAllClaim().subscribe(response => this.claims = response);
    claimService.getAllClaim().subscribe(
      {
        next: (response) => {
          this.filteredClaims = response;
        }
      }
    );

  }
  deleteClaim(claimId: number) {
   let confirmation:boolean = confirm(`Are you sure you want to delete claim with ID: ${claimId}?`) 
   if(confirmation) {
    this.claimService.deleteClaim(claimId).subscribe({
      next:(response) => {
        
        console.log(response);
        // window.location.reload();
      }
    })
   }
   
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
  paginatedClaims(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredClaims.slice(start, start + this.itemsPerPage);
  }


  totalPages(): number {
    return Math.ceil(this.filteredClaims.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  searchByClaimId(): void {
    if (this.searchClaimId.trim() === '') {
      this.filteredClaims = [...this.claims];
    } else {
      this.filteredClaims = this.claims.filter(claim =>
        claim.claimId.toString().includes(this.searchClaimId.trim())
      );
    }
    this.currentPage = 1; // Reset to first page
  }



  reviewByAmt(claimId: number) {
    this.claimService.reviewByAmount(claimId).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
    window.location.reload();
  }
  reviewByPeriod(claimId: number) {
    console.log(claimId)
    this.claimService.reviewByValidityPeriod(claimId).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
    window.location.reload();
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
