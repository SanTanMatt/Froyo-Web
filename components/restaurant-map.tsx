'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRestaurant, usePriceReports } from '@/hooks/useContract';
import { formatEther } from 'viem';
import type { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface RestaurantMapProps {
  count: number;
}

interface RestaurantMarkerProps {
  id: number;
}

function RestaurantMarker({ id }: RestaurantMarkerProps) {
  const { data: restaurant } = useRestaurant(BigInt(id));
  const { data: priceReports } = usePriceReports(BigInt(id));
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [customIcon, setCustomIcon] = useState<DivIcon | null>(null);

  useEffect(() => {
    if (restaurant?.location) {
      const geocodeAddress = async () => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_GEO_CODE;
          const response = await fetch(
            `https://geocode.maps.co/search?q=${encodeURIComponent(restaurant.location)}&api_key=${apiKey}`
          );
          
          if (!response.ok) {
            throw new Error('Geocoding failed');
          }
          
          const data = await response.json();
          
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            // Default to NYC if geocoding fails
            setPosition([40.7128, -74.0060]);
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          // Default to NYC if geocoding fails
          setPosition([40.7128, -74.0060]);
        }
      };
      
      geocodeAddress();
    }
  }, [restaurant]);

  useEffect(() => {
    if (typeof window !== 'undefined' && position && restaurant) {
      // Get latest price
      const latestPrice = priceReports && priceReports.length > 0 
        ? `$${formatEther(priceReports[priceReports.length - 1].price)}`
        : 'No prices';

      // Create custom HTML for the marker
      const iconHtml = `
        <div class="custom-marker">
          ${priceReports && priceReports.length > 0 ? `
            <div class="price-placard">
              ${latestPrice}
            </div>
          ` : ''}
          <div class="ice-cream-icon">
            🍦
          </div>
        </div>
      `;

      // Create custom icon
      const L = window.L;
      if (L && L.divIcon) {
        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-div-icon',
          iconSize: [40, 60],
          iconAnchor: [20, 50],
          popupAnchor: [0, -50],
        });

        setCustomIcon(icon);
      }
    }
  }, [position, restaurant, priceReports]);

  if (!restaurant || !position || !customIcon) return null;

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold">{restaurant.name}</h3>
          <p className="text-sm text-gray-600">{restaurant.location}</p>
          {priceReports && priceReports.length > 0 && (
            <p className="text-sm font-medium text-purple-600 mt-1">
              Latest: {priceReports[priceReports.length - 1].priceType}
            </p>
          )}
          <a 
            href={`/restaurant/${id}`}
            className="text-sm text-purple-600 hover:underline"
          >
            View Details →
          </a>
        </div>
      </Popup>
    </Marker>
  );
}

export function RestaurantMap({ count }: RestaurantMapProps) {
  const [mounted, setMounted] = useState(false);
  const restaurantIds = Array.from({ length: count }, (_, i) => i + 1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Fix for Leaflet icon issue in Next.js
      const L = window.L;
      if (L && L.Icon && L.Icon.Default) {
        const iconDefault = L.Icon.Default.prototype as unknown as Record<string, unknown>;
        delete iconDefault._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });
      }
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurantIds.map(id => (
          <RestaurantMarker key={id} id={id} />
        ))}
      </MapContainer>
    </div>
  );
}