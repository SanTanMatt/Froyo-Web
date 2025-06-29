import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              <span className="text-purple-600">Froyo</span> Tracker
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Track frozen yogurt prices across restaurants and earn rewards
            </p>
            
            <div className="flex justify-center gap-6 mb-16">
              <Link
                href="/restaurants"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Explore Restaurants
              </Link>
              <Link
                href="/add-restaurant"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors"
              >
                Add Restaurant
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold mb-2">Track Restaurants</h3>
                <p className="text-gray-600">
                  Post froyo restaurants and track their locations on the map
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Report Prices</h3>
                <p className="text-gray-600">
                  Submit price reports and earn 100 tokens for each report
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🪙</div>
                <h3 className="text-xl font-semibold mb-2">Earn Tokens</h3>
                <p className="text-gray-600">
                  Each restaurant has its own token - earn by posting and reporting
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}