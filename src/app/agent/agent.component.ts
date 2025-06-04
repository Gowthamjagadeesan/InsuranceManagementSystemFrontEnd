import { Component } from '@angular/core';
import { AgentService } from '../agent.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-agent',
  imports: [CommonModule,FormsModule],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent {
   filteredAgents: Agent[] = [];
   agents: Agent[];
   searchTerm: string = '';
   currentPage: number = 1;
   itemsPerPage: number = 5;
   claimStatus = "FILLED";
   selectedAgent: Agent | null = null;
   policies: Policy[];
   policies1: Policy1[];
   selectedPolicy: Policy1 | null = null;

   constructor(private agentService:AgentService,private polService:PolicyService) {
    agentService.getAllAgents().subscribe({
      next:(response)=>{
        console.log(response);
        this.agents = response;
        this.filteredAgents = [...this.agents]; 
      }
    })

    polService.getAll().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.policies1 = response;
        }
      }
    );
   }
   assign(custAssign) {
    console.log(custAssign)
    console.log(this.selectedAgent.agentId)
  }

  filterAgents(): void {
    this.filteredAgents = this.agents.filter(a =>
      a.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  paginatedAgents(): Agent[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredAgents.slice(start, start + this.itemsPerPage);
    }
  
    get totalPages(): number {
      return Math.ceil(this.filteredAgents.length / this.itemsPerPage);
    }
  
    nextPage(): void {
      if (this.currentPage < this.totalPages) this.currentPage++;
    }
  
    prevPage(): void {
      if (this.currentPage > 1) this.currentPage--;
    }
  
    trackByAgentId(index: number, agent: Agent): number {
      return agent.agentId;
    }

    loadPolicies(agent: Agent) {
        this.selectedAgent = agent;
        this.agentService.getPolicies(agent.agentId).subscribe(
          {
            next: (response) => {
              this.policies = response;
              console.log(this.policies)
            }
          }
        )
    
      }

      add(agentForm: NgForm) {

        const agentData = agentForm.value; // This is of type Customer1
        console.log(agentData);
        agentData.policies = [];
        this.agentService.saveAgent(agentData).subscribe(
          {
            next: (response => console.log(response))
          }
        )
        this.agentService.saveuser(agentData.name,agentData.email).subscribe({
          next: (response => console.log(response))
        })
         window.location.reload();
      }
      edit(agent: Agent) {
          this.selectedAgent = { ...agent };
        }
  update(agent: Agent) {
      if (this.selectedAgent) {
        console.log(this.selectedAgent.agentId)
        agent.agentId = this.selectedAgent.agentId
        this.agentService.updateAgent(agent).subscribe(
          {
            next: (response => console.log(response))
          }
        )
      }
    }

    editPol(policy: any) {
      this.selectedPolicy = { ...policy };
      console.log(this.selectedPolicy);
      console.log(this.selectedAgent);
      this.agentService.assignToAgent(this.selectedPolicy.policyId, this.selectedAgent.agentId, this.selectedPolicy.policyName).subscribe(
        {
          next: (response) => {
            console.log(response)
          }
        }
      )
    }
  delete(agent: Agent) {
  
  
  
      let confirmation = confirm("Do you want to delete the Customer")
      if (confirmation) {
        this.selectedAgent = agent;
        this.agentService.deleteAgent(agent.agentId).subscribe(
          {
            next: (response) => {
              console.log(response)
            }
          }
        )
        console.log(agent.name)
        this.agentService.deleteUserByRole(agent.name, "agent").subscribe(
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
}

export class Agent {
  agentId: number;
  name: string;
  email: string;
  policies: Policy[];
}

export class Agent1 {

  name: string;
  email: string;
  policies: Policy[];
}

export class Policy {
  policyId: number;
  assignedPolicies: string;
}

export class Policy1 {
  policyId: number;
  policyName: string;
  premiumAmount: number;
  coverageDetails: string;
  validityPeriod: Date;
}
