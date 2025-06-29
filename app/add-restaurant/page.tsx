'use client';

import { Navbar } from '@/components/navbar';
import { usePostRestaurant } from '@/hooks/useContract';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function AddRestaurantPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { postRestaurant, isPending, isConfirming, isConfirmed, error } = usePostRestaurant();
  
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  useEffect(() => {
    if (isConfirmed) {
      router.push('/restaurants');
    }
  }, [isConfirmed, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location) return;
    
    await postRestaurant(formData.name, formData.location);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Froyo Restaurant</h1>
            
            {!isConnected ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Please connect your wallet to add a restaurant
                </p>
                <ConnectButton />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Sweet Swirls Froyo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="123 Main St, New York, NY 10001"
                    required
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">What happens when you add a restaurant?</h3>
                  <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                    <li>A new ERC20 token is created for this restaurant</li>
                    <li>You receive 1,000,000 tokens as the poster</li>
                    <li>Others can report prices and earn 100 tokens per report</li>
                  </ul>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">
                      Error: {error.message}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending || isConfirming || !formData.name || !formData.location}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Waiting for approval...' : 
                   isConfirming ? 'Adding restaurant...' : 
                   'Add Restaurant'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}