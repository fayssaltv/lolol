import React from 'react';
import { useStore } from '../store';

export const Inventory = () => {
  const products = useStore((state) => state.products);

  return (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">المخزون الحالي</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">المنتج</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الفئة</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الكمية المتوفرة</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      product.quantity <= product.minQuantity
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {product.quantity <= product.minQuantity ? 'منخفض' : 'جيد'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};