import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'customer-home',
  imports: [UpperCasePipe],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent {
  constructor(private router: Router) {
  }
  name=sessionStorage.getItem("username");
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
