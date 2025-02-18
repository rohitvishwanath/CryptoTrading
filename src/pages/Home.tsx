import React from 'react';
import { useQuery } from 'react-query';
import { getTopCryptos } from '../api/cryptoApi';
import CryptoCard from '../components/CryptoCard';
import { Search } from 'lucide-react';

const Home = () => {
  const [search, setSearch] = React.useState('');
  const { data: cryptos, isLoading } = useQuery('cryptos', getTopCryptos, {
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const filteredCryptos = cryptos?.filter(crypto =>
    crypto.name.toLowerCase().includes(search.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Real-Time Cryptocurrency Tracker
        </h1>
        <p className="text-gray-600 mb-6">
          Track live cryptocurrency prices and market trends
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCryptos?.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default Home;