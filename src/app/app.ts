import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerRegistrationForm } from './customer-registration/customer-registration-form/customer-registration-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, CustomerRegistrationForm],
  standalone: true
})
export class App {
  protected readonly title = 'customer-registration-main';
}
