import React from 'react';
import { ArrowLeft, Music } from 'lucide-react';

const ScalePractice = ({ goBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={goBack}
          className="flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Guitar
        </button>

        <h1 className="text-3xl font-bold mb-4">Scale Practice</h1>
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
          <p className="text-xl text-gray-300">
            Interactive Scale Practice Tool coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScalePractice;