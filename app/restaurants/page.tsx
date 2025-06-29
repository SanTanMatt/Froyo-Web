'use client';

import { Navbar } from '@/components/navbar';
import { useRestaurantCount } from '@/hooks/useContract';
import { RestaurantList } from '@/components/restaurant-list';
import { RestaurantMap } from '@/components/restaurant-map';
import { useState } from 'react';

export default function RestaurantsPage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const { data: restaurantCount } = useRestaurantCount();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Froyo Restaurants</h1>
              <p className="text-gray-600 mt-2">
                {restaurantCount ? Number(restaurantCount) : 0} restaurants tracked
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('map')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'map' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Map View
              </button>
            </div>
          </div>

          {view === 'list' ? (
            <RestaurantList count={restaurantCount ? Number(restaurantCount) : 0} />
          ) : (
            <RestaurantMap count={restaurantCount ? Number(restaurantCount) : 0} />
          )}
        </div>
      </div>
    </>
  );
}