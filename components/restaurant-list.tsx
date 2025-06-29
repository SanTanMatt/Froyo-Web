'use client';

import { useRestaurant } from '@/hooks/useContract';
import Link from 'next/link';

interface RestaurantListProps {
  count: number;
}

interface RestaurantCardProps {
  id: number;
}

function RestaurantCard({ id }: RestaurantCardProps) {
  const { data: restaurant, isLoading } = useRestaurant(BigInt(id));

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!restaurant) return null;

  const date = new Date(Number(restaurant.timestamp) * 1000);

  return (
    <Link href={`/restaurant/${id}`} className="block">
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
          {!restaurant.active && (
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
              Inactive
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-2 flex items-center">
          <span className="mr-2">📍</span>
          {restaurant.location}
        </p>
        
        <div className="text-sm text-gray-700 space-y-1">
          <p>Posted by: <span className="font-mono text-gray-900">{restaurant.poster.slice(0, 6)}...{restaurant.poster.slice(-4)}</span></p>
          <p>Posted on: <span className="text-gray-900">{date.toLocaleDateString()}</span></p>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-purple-600 font-medium">
            View prices and earn tokens →
          </p>
        </div>
      </div>
    </Link>
  );
}

export function RestaurantList({ count }: RestaurantListProps) {
  const restaurantIds = Array.from({ length: count }, (_, i) => i + 1);

  if (count === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No restaurants posted yet.</p>
        <Link 
          href="/add-restaurant" 
          className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Be the first to add one!
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurantIds.map(id => (
        <RestaurantCard key={id} id={id} />
      ))}
    </div>
  );
}