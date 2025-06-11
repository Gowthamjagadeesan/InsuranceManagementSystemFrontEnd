import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  user: LoginUser
  path = "http://localhost:9090/auth/authenticate"
  getAgentName = "http://localhost:9090/agent/searchByName/"
  constructor(private client: HttpClient, private router: Router) {

  }
  public isLogedIn = false;
  //  login(user: LoginUser) {
  //   console.log("Inservice")
  //   console.log(user)
  //   this.isLogedIn = true;

  //   try {
  //     return  this.client.post(this.path, user, { responseType: 'text' });
  //   } catch (error: any) {
  //     if (error.response && error.response.status === 403) {
  //       console.error("Access denied: Invalid credentials or insufficient permissions.");
  //       // Optionally show a user-friendly message or redirect
  //     } else {
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   }

  // }
  private tokenTimer: any;

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  login(user: LoginUser) {
    console.log("In service");
    console.log(user);
    return this.client.post(this.path, user, { responseType: 'text' }).pipe(
      tap(() => {
        this.isLogedIn = true;
       // this.notificationCount
      })
    )
}
  // get notificationCount(): number {
  //      this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe(data => {
  //      this.commonService.notificationCount = data.length;
  //    });
  //   return this.commonService.notificationCount;
  // }
  startTokenTimer(): void {
    const token = this.getToken();
    console.log("inside start timer.........")
    console.log('Token expired:', this.isTokenExpired());
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiresIn = payload.exp * 1000 - Date.now();
    // const expiresIn = 5000;

    if (expiresIn > 0) {
      this.tokenTimer = setTimeout(() => {
        alert('Session expired. Please login again.');
        localStorage.clear()
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }, expiresIn);
    }
  }

  clearTokenTimer(): void {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.getTokenPayload();
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  getAgentByName() {
    const name = sessionStorage.getItem("username");
    return this.client.get<Agent>(this.getAgentName + name)
  }
  getJWT(): string {
    return localStorage.getItem("token")
  }
  removeToken() {
    localStorage.removeItem("token")
    return true
  }

  logStatus(): boolean {
    console.log(this.isLogedIn);
    return this.isLogedIn;
  }
  logout(): boolean {

    alert("logout successful")
    this.router.navigate(["/login"])
    localStorage.clear()
    sessionStorage.clear();
    this.isLogedIn = false;
    return this.isLogedIn
  }

}
export class LoginUser {
  name: string;
  password: string
}
export class Agent {
  agentId: number;
  name: string;
  email: string;
  policy: Policy[];
}
export class Policy {
  policyId: number;
  assignedPolicies: string
}
