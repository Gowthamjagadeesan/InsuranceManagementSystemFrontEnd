import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  form: RegisterUser ;
  form2:Customer
  constructor(private client: HttpClient) { }

  path1 = "http://localhost:9090/auth/new";
  path2 = "http://localhost:9090/customer/create";
  path3="http://localhost:9090/agent/save";

  // Register only the user
  registerUser(form: RegisterUser): Observable<any> {
    console.log("Registering user:", form);
    return this.client.post(this.path1, form, { responseType: 'text' });
  }

  // Register only the customer
  registerCustomer(form: Customer): Observable<any> {
    console.log("Registering customer:", this.form2);
    return this.client.post(this.path2, form, { responseType: 'text' });
  }

  registerAgent(form: Agent): Observable<any> {
    console.log("Registering customer:", this.form2);
    return this.client.post(this.path3, form, { responseType: 'text' });
  }

  // Register both user and customer in sequence
  registerBoth1(form: RegisterUser & Customer): Observable<any> {
    form.policies=[]
    console.log("Registering both user and customer:", form);
    return this.registerUser(form).pipe(
      switchMap(() => this.registerCustomer(form)),
      catchError((error) => {
        console.error("Registration failed:", error);
        return throwError(() => error);
      })
    );
  }

  registerBoth2(form: RegisterUser & Agent): Observable<any> {
    form.policies=[]
    console.log("Registering both user and Agent:", form);
    return this.registerUser(form).pipe(
      switchMap(() => this.registerAgent(form)),
      catchError((error) => {
        console.error("Registration failed:", error);
        return throwError(() => error);
      })
    );
  }
}

export class RegisterUser {
  name: string;
  email: string;
  password: string;
  role: string;
}
export class Customer {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  policies: Policy[];
}
export class Agent{
  name:string;
  email:string;
  policies:Policy[];

}
export class Policy {
  policyId: number;
  policyName: string;
}
