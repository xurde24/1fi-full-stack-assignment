export interface Variant {
  id: string;
  productId: string;
  color: string;
  storage: string;
  price: number;
  mrp: number;
  imageUrl: string;
}

export interface EmiPlan {
  id: string;
  productId: string;
  monthlyPayment: number;
  tenureMonths: number;
  interestRate: number;
  cashback: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
  emiPlans: EmiPlan[];
}