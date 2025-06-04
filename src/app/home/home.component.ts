import { Component } from '@angular/core';
import { InsuranceComponent } from '../insurance/insurance.component';

@Component({
  selector: 'home',
  imports: [InsuranceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
