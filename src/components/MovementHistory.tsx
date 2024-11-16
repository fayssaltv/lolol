import React, { useState } from 'react';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { useStore } from '../store';

export const MovementHistory = () => {
  const [dateFilter, setDateFilter] = useState('');
  const movements = useStore((state) => state.movements);
  const getProduct = useStore((state) => state.getProduct);

  const filteredMovements = dateFilter
    ? movements.filter(m => m.date.startsWith(dateFilter))
    : movements;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">سجل الحركات</h2>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">التاريخ</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">المنتج</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">نوع الحركة</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">الكمية</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">المورد/المستلم</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMovements.map((movement) => {
              const product = getProduct(movement.productId);
              return (
                <tr key={movement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(movement.date), 'PPP', { locale: arSA })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        movement.type === 'in'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {movement.type === 'in' ? 'دخول' : 'خروج'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.type === 'in' ? movement.supplier : movement.recipient}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};