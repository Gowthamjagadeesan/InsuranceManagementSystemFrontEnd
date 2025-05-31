import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { PoliciesComponent } from './policies/policies.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "about-us", component: AboutUsComponent },
    { path: "insurance", component: InsuranceComponent },
    { path: "cust-home", component: CustomerHomeComponent },
    { path: "agent-home", component: AgentHomeComponent },
    { path: 'login/:role', component: LoginComponent },
    { path: "cust-op", component: CustomerComponent },
    { path: "policy-op", component: PoliciesComponent },
    { path: "", component: HomeComponent }
];
