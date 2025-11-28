import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-registration-form',
  templateUrl: './customer-registration-form.html',
  styleUrl: './customer-registration-form.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CustomerRegistrationForm implements OnInit {
  customerForm: FormGroup;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerForm = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10)
      ]],
      customerType: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;
      
      this.customerService.registerCustomer(customerData);
      
      this.showSuccessMessage = true;
      
      setTimeout(() => {
        this.customerForm.reset({
          fullName: '',
          email: '',
          phone: '',
          customerType: '',
          acceptTerms: false
        });
        this.showSuccessMessage = false;
        
        Object.keys(this.customerForm.controls).forEach(key => {
          this.customerForm.get(key)?.markAsUntouched();
        });
      }, 3000);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.customerForm.controls).forEach(key => {
      this.customerForm.get(key)?.markAsTouched();
    });
  }

  get fullName(): AbstractControl | null { return this.customerForm.get('fullName'); }
  get email(): AbstractControl | null { return this.customerForm.get('email'); }
  get phone(): AbstractControl | null { return this.customerForm.get('phone'); }
  get customerType(): AbstractControl | null { return this.customerForm.get('customerType'); }
  get acceptTerms(): AbstractControl | null { return this.customerForm.get('acceptTerms'); }
}