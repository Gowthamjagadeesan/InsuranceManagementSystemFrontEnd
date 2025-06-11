import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from '../common.service';
import { LoginserviceService } from '../loginservice.service';
import { jwtDecode } from 'jwt-decode';
import { ListcustomerService } from '../listcustomer.service';
import { PolicyService } from '../policy.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'login',
  imports: [RouterLink, RouterOutlet, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})




export class LoginComponent {
  constructor(private router: Router, private cdr: ChangeDetectorRef, private commonService: CommonService, private logService: LoginserviceService, private access: ActivatedRoute, private policyService: PolicyService) {
    cdr: ChangeDetectorRef;
  }


  loginError: string = '';


  token: string;
 
  validated(form: NgForm): any {
    console.log("validate function calling.......");
    console.log(form.value);

    this.logService.login(form.value).subscribe({
      next: (response) => {
        localStorage.setItem("token", response);
        console.log("Login successful:", response);
        const token = response;
        const decoded = jwtDecode<JwtPayload>(token);
        const role: string = decoded.roles ?? 'No role found';
        console.log(role);
        sessionStorage.setItem("role", role);
        this.logService.startTokenTimer();
        console.log(form.value.username);
        sessionStorage.setItem("username", form.value.username);
       

        if (role === 'Customer') {
          this.policyService.getCustomerByName(form.value.username).subscribe({
            next: (response) => {
              console.log("Customer response:", response);

              console.log("Customer ID:", response.customerId);
              sessionStorage.setItem("custId", response.customerId.toString());
              this.commonService.loadNoti(response.customerId.toString()).subscribe(data => {
                this.commonService.notificationCount = data.length;
              });

            }
          })
          
          this.notificationCount;
          console.log("Notification count:", this.notificationCount);
          this.router.navigate(["/cust-home"]);
        }
        else {
          this.logService.getAgentByName().subscribe({
            next: (response) => {

              console.log("Agent response:", response);
              console.log("Agent ID:", response.agentId);
              sessionStorage.setItem("agentId", response.agentId.toString());
            }
          })
          
          this.router.navigate(["/agent-home"]);
        }
      },
      error: (err) => {
        if (err.status === 403) {


          console.error('Login error:', err);

          
          this.loginError = "Invalid credentials. Please try again.";
          this.cdr.detectChanges(); 
        } else {
         
          this.loginError = "Something went wrong. Please try later.";
          this.cdr.detectChanges();
        }
      }
    });
  }
  get notificationCount(): number {
    // this.commonService.loadNoti(sessionStorage.getItem("custId")).subscribe(data => {
    //   this.commonService.notificationCount = data.length;
    // });
    return this.commonService.notificationCount;
  }
}

interface JwtPayload {
  roles?: string;
}
