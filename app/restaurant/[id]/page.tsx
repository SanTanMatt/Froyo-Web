'use client';

import { Navbar } from '@/components/navbar';
import { useRestaurant, usePriceReports, useReportPrice, useTokenBalance } from '@/hooks/useContract';
import { useState, useEffect, use } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface PageParams {
  params: Promise<{ id: string }>;
}

export default function RestaurantDetailPage({ params }: PageParams) {
  const resolvedParams = use(params);
  const restaurantId = BigInt(resolvedParams.id);
  const { address, isConnected } = useAccount();
  
  const { data: restaurant } = useRestaurant(restaurantId);
  const { data: priceReports } = usePriceReports(restaurantId);
  const { reportPrice, isPending, isConfirming, isConfirmed, error } = useReportPrice();
  const { data: tokenBalance } = useTokenBalance(
    restaurant?.tokenAddress as `0x${string}` | undefined,
    address
  );

  const [showReportForm, setShowReportForm] = useState(false);
  const [formData, setFormData] = useState({
    price: '',
    priceType: 'small'
  });

  useEffect(() => {
    if (isConfirmed) {
      setShowReportForm(false);
      setFormData({ price: '', priceType: 'small' });
    }
  }, [isConfirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.price) return;
    
    await reportPrice(restaurantId, formData.price, formData.priceType);
  };

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Loading restaurant details...</p>
        </div>
      </>
    );
  }

  const date = new Date(Number(restaurant.timestamp) * 1000);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Restaurant Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
                <p className="text-lg text-gray-600 mt-2 flex items-center">
                  <span className="mr-2">📍</span>
                  {restaurant.location}
                </p>
              </div>
              {!restaurant.active && (
                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">
                  Inactive
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
              <div>
                <p className="text-gray-600 font-medium">Posted by</p>
                <p className="font-mono text-gray-900">{restaurant.poster.slice(0, 6)}...{restaurant.poster.slice(-4)}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Posted on</p>
                <p className="text-gray-900">{date.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Token Address</p>
                <p className="font-mono text-xs text-gray-900 break-all">{restaurant.tokenAddress}</p>
              </div>
            </div>

            {isConnected && tokenBalance !== undefined && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500">Your token balance</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatEther(tokenBalance)} {restaurant.name} Tokens
                </p>
              </div>
            )}
          </div>

          {/* Price Reports Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Price Reports</h2>
              {isConnected && restaurant.active && (
                <button
                  onClick={() => setShowReportForm(!showReportForm)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Report Price
                </button>
              )}
            </div>

            {/* Report Form */}
            {showReportForm && (
              <div className="mb-6 p-6 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Report Froyo Price</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price (USD)
                      </label>
                      <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="4.99"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-2">
                        Size
                      </label>
                      <select
                        id="priceType"
                        value={formData.priceType}
                        onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="per_oz">Per Ounce</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{error.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending || isConfirming || !formData.price}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                  >
                    {isPending ? 'Waiting for approval...' : 
                     isConfirming ? 'Reporting price...' : 
                     'Submit Report (+100 tokens)'}
                  </button>
                </form>
              </div>
            )}

            {/* Price History */}
            {priceReports && priceReports.length > 0 ? (
              <div className="space-y-4">
                {[...priceReports].reverse().map((report, index) => {
                  const reportDate = new Date(Number(report.timestamp) * 1000);
                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-2xl font-semibold text-gray-900">
                            ${formatEther(report.price)}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">{report.priceType}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-gray-700">{reportDate.toLocaleDateString()}</p>
                          <p className="font-mono text-gray-900">{report.reporter.slice(0, 6)}...{report.reporter.slice(-4)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No price reports yet.</p>
                {isConnected && restaurant.active ? (
                  <p className="text-sm text-gray-400 mt-2">Be the first to report a price and earn tokens!</p>
                ) : !isConnected ? (
                  <div className="mt-4">
                    <ConnectButton />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}