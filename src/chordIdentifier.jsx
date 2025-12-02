import React, { useState } from 'react';
import { ArrowLeft, Music, Trash2 } from 'lucide-react';
import Fretboard from './Fretboard';

const ChordIdentifier = ({ goBack }) => {
  // 1. Restore the State (Memory)
  const [selectedNotes, setSelectedNotes] = useState({});

  // 2. Restore the Logic (What happens when clicked)
  const handleFretClick = (stringIndex, fretIndex) => {
    setSelectedNotes((prev) => {
      // Create a copy of the current notes so we can modify it
      const newNotes = { ...prev };
      
      // Check if we are clicking a note that is already selected
      if (newNotes[stringIndex] === fretIndex) {
        // If yes, remove it (toggle off)
        delete newNotes[stringIndex];
      } else {
        // If no, add/update the note for this specific string
        // This allows one note per string, but multiple strings can be active!
        newNotes[stringIndex] = fretIndex;
      }
      
      return newNotes;
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
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Music className="w-8 h-8 text-purple-400" />
            Chord Identifier
          </h1>
          <p className="text-gray-400">Click the frets to place your fingers.</p>
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

export default ChordIdentifier;