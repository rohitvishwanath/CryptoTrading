import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCryptoDetails } from '../api/cryptoApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Globe, Link as LinkIcon } from 'lucide-react';

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: crypto, isLoading, error } = useQuery(['crypto', id], () => getCryptoDetails(id!), {
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !crypto) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading cryptocurrency data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const priceChangeData = [
    { name: '24h', value: crypto.market_data.price_change_percentage_24h },
    { name: '7d', value: crypto.market_data.price_change_percentage_7d },
    { name: '30d', value: crypto.market_data.price_change_percentage_30d },
    { name: '1y', value: crypto.market_data.price_change_percentage_1y },
  ].filter(item => item.value !== undefined);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src={crypto.image.large} 
              alt={crypto.name} 
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{crypto.name}</h1>
              <p className="text-gray-500 uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            {crypto.links?.homepage[0] && (
              <a
                href={crypto.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
              >
                <Globe className="w-5 h-5" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Price Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span>Current Price</span>
            </div>
            <p className="text-2xl font-bold">
              ${crypto.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <BarChart2 className="w-5 h-5" />
              <span>Market Cap Rank</span>
            </div>
            <p className="text-2xl font-bold">#{crypto.market_cap_rank}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              {crypto.market_data.price_change_percentage_24h > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span>24h Change</span>
            </div>
            <p className={`text-2xl font-bold ${
              crypto.market_data.price_change_percentage_24h > 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Price History</h2>
          <div className="h-64 bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceChangeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                />
                <YAxis 
                  stroke="#6b7280"
                  tickFormatter={(value) => `${value.toFixed(2)}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Price Change']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Market Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-semibold">
                  ${crypto.market_data.market_cap.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24h Volume</span>
                <span className="font-semibold">
                  ${crypto.market_data.total_volume.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Circulating Supply</span>
                <span className="font-semibold">
                  {crypto.market_data.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Price Changes</h3>
            <div className="space-y-3">
              {priceChangeData.map(({ name, value }) => (
                <div key={name} className="flex justify-between">
                  <span className="text-gray-600">{name} Change</span>
                  <span className={`font-semibold ${
                    value > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {value.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About {crypto.name}</h2>
          <div 
            className="text-gray-600 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: crypto.description.en }}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;