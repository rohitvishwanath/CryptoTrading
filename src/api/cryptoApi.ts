import axios from 'axios';
import { CryptoData, DetailedCryptoData } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getTopCryptos = async (): Promise<CryptoData[]> => {
  const response = await axios.get(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false`
  );
  return response.data;
};

export const getCryptoDetails = async (id: string): Promise<DetailedCryptoData> => {
  const response = await axios.get(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  return response.data;
};