import React, { useState } from 'react';
import { useStore } from '../store';

export const NewMovement = () => {
  const [productId, setProductId] = useState('');
  const [type, setType] = useState<'in' | 'out'>('in');
  const [quantity, setQuantity] = useState('');
  const [party, setParty] = useState('');

  const products = useStore((state) => state.products);
  const addMovement = useStore((state) => state.addMovement);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity) return;

    addMovement({
      id: Date.now().toString(),
      productId,
      type,
      quantity: parseInt(quantity),
      date: new Date().toISOString(),
      ...(type === 'in' ? { supplier: party } : { recipient: party })
    });

    setProductId('');
    setQuantity('');
    setParty('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">تسجيل حركة جديدة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المنتج</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">اختر المنتج</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (المتوفر: {product.quantity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع الحركة</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'in' | 'out')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="in">دخول</option>
              <option value="out">خروج</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الكمية</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'in' ? 'المورد' : 'الجهة المستلمة'}
            </label>
            <input
              type="text"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          تسجيل الحركة
        </button>
      </form>
    </div>
  );
};