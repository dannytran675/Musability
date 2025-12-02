import React, { useState } from 'react';
// FIXED: Added Trash2 to the import list
import { ArrowLeft, Music, Trash2 } from 'lucide-react';
import Fretboard from './Fretboard';

const ScalePractice = ({ goBack }) => {
  // 1. Restore the State (Memory)
  const [selectedNotes, setSelectedNotes] = useState({});

  // 2. Restore the Logic (What happens when clicked)
  const handleFretClick = (stringIndex, fretIndex) => {
    setSelectedNotes((prev) => {
      // Check if clicking the currently selected note
      const isSameNote = prev[stringIndex] === fretIndex;
      
      if (isSameNote) {
        return {}; // If same note, clear the board (toggle off)
      }
      
      // If new note, REPLACE the entire state with just this one note (Monophonic)
      return { [stringIndex]: fretIndex };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={goBack}
            className="flex items-center text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Guitar
          </button>

          <button 
            onClick={() => setSelectedNotes({})}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-red-900/30 text-gray-400 hover:text-red-400 rounded-lg transition-colors border border-gray-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Board
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
             {/* Changed Music to Hash icon if you prefer scale look, or keep Music */}
             <Music className="w-8 h-8 text-purple-400" />
             Scale Practice
          </h1>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center mb-8 inline-block">
            <p className="text-xl text-gray-300">
              Interactive Scale Practice Tool
            </p>
          </div>
        </div>

        {/* 3. Pass the props to the Fretboard */}
        <Fretboard 
          selectedNotes={selectedNotes} 
          onFretClick={handleFretClick}
        />
      </div>
    </div>
  );
};

export default ScalePractice;