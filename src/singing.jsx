import React from 'react';
import { ArrowLeft, Music } from 'lucide-react';

const SingingPage = ({ goBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <button 
          onClick={goBack}
          className="flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
        <h1 className="text-4xl font-bold text-purple-400 flex items-center gap-3">
          <Music className="w-10 h-10" />
          Singing Practice
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto grid gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Lesson 1: The Basics</h2>
          <p className="text-gray-300">
            Welcome to the singing section! Here is where your singing lessons will appear.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingingPage;