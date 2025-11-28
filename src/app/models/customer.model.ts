export interface Customer {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  customerType: 'Regular' | 'Premium' | 'Empresarial';
  acceptTerms: boolean;
}

export type CustomerType = 'Regular' | 'Premium' | 'Empresarial';