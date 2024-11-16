import React from 'react';
import { Stats } from './components/Stats';
import { NewMovement } from './components/NewMovement';
import { Inventory } from './components/Inventory';
import { MovementHistory } from './components/MovementHistory';

function App() {
  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">نظام إدارة المخزون</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Stats />
        <NewMovement />
        <Inventory />
        <MovementHistory />
      </main>
    </div>
  );
}

export default App;