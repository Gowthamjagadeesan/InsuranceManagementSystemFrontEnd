import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  user:User;
  constructor(private client:HttpClient) { }
  getAll="http://localhost:9090/agent/searchAll";
  getPol="http://localhost:9090/agent/getPolicyByAgent/";
  save="http://localhost:9090/agent/save";
  savesec="http://localhost:9090/auth/new";
  update="http://localhost:9090/agent/update";
  delete="http://localhost:9090/agent/delete/";
  deleteUser="http://localhost:9090/auth/delete/";
  assignAgent="http://localhost:9090/policy/assignPoliciesToAgent/"

   registerUser(user: User): Observable<any> {
      console.log("Registering user:", user);
      return this.client.post(this.savesec, user, { responseType: 'text' });
    }
  
      registerAgent(agent: Agent): Observable<any> {
        console.log("Registering customer:", agent);
        return this.client.post(this.save, agent, { responseType: 'text' });
      }
      registerBoth2(user: User & Agent): Observable<any> {
        
          user.policies=[]
          
          console.log("Registering both user and Agent:", user);
          return this.registerUser(user).pipe(
            switchMap(() => this.registerAgent(user)),
            catchError((error) => {
              console.error("Registration failed:", error);
              return throwError(() => error);
            })
          );
        }
      
    

  getAllAgents() {
    return this.client.get<Agent[]>(this.getAll);
  }
  getPolicies(agentId: number) {
    return this.client.get<Policy[]>(this.getPol+agentId);
  }
  saveAgent(agent: Agent) {
    return this.client.post(this.save, agent,{responseType: 'text'});

  }
  saveuser(name,email) {
    this.user = new User();
    this.user.name = name;
    this.user.email =email;
    this.user.password = "1234";
    this.user.roles = "agent";
    console.log(this.user);
    return this.client.post(this.savesec, this.user,{responseType: 'text'});
  }
  updateAgent(agent: Agent) {
    return this.client.put<Agent>(this.update, agent);
  }
  deleteAgent(agentId: number) {
    return this.client.delete(this.delete + agentId, { responseType: 'text' });
  }
  deleteUserByRole(name, role) {
    return this.client.delete(this.deleteUser + name + "/" + role);
  }
  assignToAgent(polId,custId,polName){
      console.log(`from policy service...........${this.assignAgent}${polId}/${custId}/${polName}`)
      return this.client.put<Agent>(`${this.assignAgent}${polId}/${custId}/${polName}`, {});
    }
}

export class Agent {
  agentId: number;
  name: string;
  email: string;
  policies: Policy[];
}

export class Policy {
  policyId: number;
  assignedPolicies: string;
}

export class User {
  name: string;
  email:string;
  password: string;
  roles: string;
}
