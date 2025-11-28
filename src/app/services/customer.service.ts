import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];

  registerCustomer(customer: Customer): void {
    const newCustomer = {
      ...customer,
      id: this.generateId()
    };
    this.customers.push(newCustomer);
    console.log('Cliente registrado:', newCustomer);
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }
}