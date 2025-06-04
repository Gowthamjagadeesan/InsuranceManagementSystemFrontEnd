import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'customer-home',
  imports: [],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent {
  constructor(private router: Router) {
  }
  openPolicy() {
    this.router.navigate(['/policy-op']);
  }
  openMyPolicy() {
    this.router.navigate(['/mypolicy']);
  }
  openMyClaim() {
    this.router.navigate(['/myclaim']);
  }
}
