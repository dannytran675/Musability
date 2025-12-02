import React from 'react';
import { ArrowLeft, Music } from 'lucide-react';

const GuitarPage = ({ goBack, onNavigate }) => {
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
          Guitar Practice
        </h1>
      </div>

      {/* Chord Identifier */}
      <div className="max-w-4xl mx-auto grid gap-6 mb-4">
        <button 
          onClick={() => onNavigate('chord-id')}
          className="w-full text-left bg-gray-800 p-6 rounded-2xl border border-gray-700 transition duration-300 hover:bg-gray-700 hover:border-purple-300">
          <h2 className="text-2xl font-semibold mb-4">Chord Identifier</h2>
          <p className="text-gray-300">
            This will help you identify chords based on finger positions!
          </p>
        </button>
      </div>

      {/* Scale Practice */}
      <div className="max-w-4xl mx-auto grid gap-6">
        <button 
          onClick={() => onNavigate('scale-prac')}
          className="w-full text-left bg-gray-800 p-6 rounded-2xl border border-gray-700 transition duration-300 hover:bg-gray-700 hover:border-purple-300">
          <h2 className="text-2xl font-semibold mb-4">Scale Practice</h2>
          <p className="text-gray-300">
            A useful tool to help you with all your scale practice!
          </p>
        </button>
      </div>

    </div>
  );
};

export default GuitarPage;