import React from 'react';
import { BarChart3, Package, Activity } from 'lucide-react';
import { useStore } from '../store';

export const Stats = () => {
  const stats = useStore((state) => state.stats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-blue-500" />
          <div className="mr-4">
            <h3 className="text-lg font-semibold text-gray-700">إجمالي المنتجات</h3>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-green-500" />
          <div className="mr-4">
            <h3 className="text-lg font-semibold text-gray-700">الحركات المسجلة</h3>
            <p className="text-2xl font-bold">{stats.totalMovements}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-red-500" />
          <div className="mr-4">
            <h3 className="text-lg font-semibold text-gray-700">منتجات منخفضة</h3>
            <p className="text-2xl font-bold">{stats.lowStockProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};