import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '../types/crypto';

interface Props {
  crypto: CryptoData;
}

const CryptoCard: React.FC<Props> = ({ crypto }) => {
  const priceChangeIsPositive = crypto.price_change_percentage_24h > 0;

  return (
    <Link to={`/crypto/${crypto.id}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-lg">{crypto.name}</h3>
              <span className="text-gray-500 uppercase">{crypto.symbol}</span>
            </div>
          </div>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            Rank #{crypto.market_cap_rank}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</div>
          <div className={`flex items-center space-x-1 ${
            priceChangeIsPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {priceChangeIsPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;