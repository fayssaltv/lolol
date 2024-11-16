import { create } from 'zustand';
import { Product, Movement, Stats } from './types';

interface StoreState {
  products: Product[];
  movements: Movement[];
  stats: Stats;
  addProduct: (product: Product) => void;
  addMovement: (movement: Movement) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  getProduct: (productId: string) => Product | undefined;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [
    { id: '1', name: 'لابتوب', category: 'إلكترونيات', quantity: 50, minQuantity: 10 },
    { id: '2', name: 'طابعة', category: 'إلكترونيات', quantity: 30, minQuantity: 5 },
    { id: '3', name: 'مكتب', category: 'أثاث', quantity: 20, minQuantity: 3 },
  ],
  movements: [],
  stats: {
    totalProducts: 3,
    totalMovements: 0,
    lowStockProducts: 0,
  },
  
  addProduct: (product) => 
    set((state) => ({ 
      products: [...state.products, product],
      stats: { ...state.stats, totalProducts: state.stats.totalProducts + 1 }
    })),

  addMovement: (movement) => {
    const product = get().getProduct(movement.productId);
    if (!product) return;

    const quantityChange = movement.type === 'in' ? movement.quantity : -movement.quantity;
    get().updateProductQuantity(movement.productId, product.quantity + quantityChange);

    set((state) => ({
      movements: [movement, ...state.movements],
      stats: { ...state.stats, totalMovements: state.stats.totalMovements + 1 }
    }));
  },

  updateProductQuantity: (productId, newQuantity) =>
    set((state) => ({
      products: state.products.map(p =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      ),
      stats: {
        ...state.stats,
        lowStockProducts: state.products.filter(p => p.quantity <= p.minQuantity).length
      }
    })),

  getProduct: (productId) => get().products.find(p => p.id === productId),
}));