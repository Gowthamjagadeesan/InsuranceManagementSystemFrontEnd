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
import { CLaimComponent } from './claim/claim.component';
import { authGuard } from './auth.guard';
import { MypolicyComponent } from './mypolicy/mypolicy.component';
import { MyclaimComponent } from './myclaim/myclaim.component';
import { AgentComponent } from './agent/agent.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "about-us", component: AboutUsComponent },
    { path: "insurance", component: InsuranceComponent },
    { path: "cust-home", component: CustomerHomeComponent },
    { path: "agent-home", component: AgentHomeComponent ,canActivate:[authGuard] },
    { path: 'login/:role', component: LoginComponent },
    { path: "cust-op", component: CustomerComponent,canActivate:[authGuard] },
    { path: "policy-op", component: PoliciesComponent },
    { path: "claim", component: CLaimComponent, canActivate:[authGuard] },
    { path: "mypolicy", component: MypolicyComponent },
    { path: "agent", component: AgentComponent, canActivate:[authGuard] },
    { path: "myclaim", component: MyclaimComponent },
    { path: "", component: HomeComponent }
];
