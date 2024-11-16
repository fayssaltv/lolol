export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
}

export interface Movement {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
  supplier?: string;
  recipient?: string;
}

export interface Stats {
  totalProducts: number;
  totalMovements: number;
  lowStockProducts: number;
}