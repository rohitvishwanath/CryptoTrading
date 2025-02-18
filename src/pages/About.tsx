import React from 'react';
import { Code, Database, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About CryptoTracker Pro
          </h1>
          <p className="text-xl text-gray-600">
            A professional-grade cryptocurrency tracking platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">
              Get live cryptocurrency prices updated every 30 seconds
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <Database className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Comprehensive Data</h3>
            <p className="text-gray-600">
              Access detailed market statistics and historical data
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Code className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Modern Technology</h3>
            <p className="text-gray-600">
              Built with React, TypeScript, and real-time API integration
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Frontend Technologies</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>React with TypeScript for type-safe development</li>
                <li>React Query for efficient data fetching and caching</li>
                <li>React Router for seamless navigation</li>
                <li>Tailwind CSS for responsive design</li>
                <li>Recharts for interactive price charts</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">API Integration</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Real-time data from CoinGecko API</li>
                <li>Automatic price updates every 30 seconds</li>
                <li>Comprehensive error handling</li>
                <li>Efficient data caching and state management</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Performance Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Optimized re-renders using React's memo and callbacks</li>
                <li>Lazy loading of routes for faster initial load</li>
                <li>Responsive design for all device sizes</li>
                <li>Progressive loading states for better UX</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;