import React, { useState } from 'react';
import { ArrowLeft, Music, Trash2 } from 'lucide-react';

const ChordIdentifier = ({ goBack }) => {
  // State to hold selected notes. Format: { stringIndex: fretIndex }
  // Example: { 5: 3 } means String 5 (Low E), Fret 3 (G note)
  const [selectedNotes, setSelectedNotes] = useState({});

  // Standard Tuning: High e (top) to Low E (bottom)
  const strings = ['e', 'B', 'G', 'D', 'A', 'E'];
  const totalFrets = 15;
  
  // Create an array [1, 2, ... 15] - Start from 1 to remove the Nut
  const frets = Array.from({ length: totalFrets }, (_, i) => i + 1);

  const handleFretClick = (stringIndex, fretIndex) => {
    console.log(`Clicked -> String Index: ${stringIndex} (${strings[stringIndex]}), Fret Index: ${fretIndex}`);
    setSelectedNotes((prev) => {
      const newNotes = { ...prev };
      // If clicking the same note, remove it (toggle off)
      if (newNotes[stringIndex] === fretIndex) {
        delete newNotes[stringIndex];
      } else {
        // Otherwise, set the new fret for this string (replaces any previous note on this string)
        newNotes[stringIndex] = fretIndex;
      }
      return newNotes;
    });
  };

  // Helper to check if a specific position is selected
  const isSelected = (stringIndex, fretIndex) => selectedNotes[stringIndex] === fretIndex;

  // Helper to render fretboard dots (3, 5, 7, 9, 12, 15)
  const renderFretMarker = (i) => {
    const singleDots = [3, 5, 7, 9, 15];
    const doubleDots = [12];
    
    // Single Dot (Centered)
    if (singleDots.includes(i)) {
      return <div className="absolute w-4 h-4 bg-gray-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>;
    }
    // Double Dot (12th fret)
    if (doubleDots.includes(i)) {
      return (
        <>
          <div className="absolute w-4 h-4 bg-gray-600 rounded-full top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute w-4 h-4 bg-gray-600 rounded-full top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        </>
      );
    }
    return null;
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
          
        {/* clear board button */}
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

        {/* Fretboard Container */}
        <div className="bg-gray-800 p-1 rounded-2xl border border-gray-700 shadow-2xl overflow-x-auto">
          <div className="min-w-[900px] relative p-4 select-none"> 
            
            {/* Fret Numbers Row */}
            <div className="flex mb-2 pl-10">
              {frets.map((fret) => (
                <div key={fret} className="flex-1 text-center text-gray-100 text-xs font-mono font-bold uppercase tracking-wider">
                  {fret}
                </div>
              ))}
            </div>

            {/* The Board */}
            <div className="flex flex-col relative bg-[#2a2a2a] rounded-lg border-2 border-gray-700 overflow-hidden">
              
              {/* Render Strings */}
              {strings.map((stringName, stringIndex) => (
                <div key={stringIndex} className="flex items-center h-12 relative border-b border-gray-800 last:border-none">
                  
                  {/* String Name Label */}
                  <div className="w-10 flex-shrink-0 text-center font-bold text-gray-100 text-lg border-r border-gray-700 h-full flex items-center justify-center bg-gray-900">
                    {stringName}
                  </div>

                  {/* The Physical String Line */}
                  {/* We change height based on index to simulate string thickness */}
                  <div 
                    className="absolute left-10 right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 z-0 pointer-events-none shadow-sm"
                    style={{ height: `${stringIndex * 0.5 + 1}px`, opacity: 0.6 }}
                  ></div>

                  {/* Frets for this string */}
                  <div className="flex flex-1 relative h-full">
                    {frets.map((fretIndex) => (
                      <div 
                        key={fretIndex}
                        onClick={() => handleFretClick(stringIndex, fretIndex)}
                        // Added 'cursor-pointer' and 'group' to enable hover effects on children
                        className="flex-1 relative flex items-center justify-center border-r border-gray-600/50 group"
                      >
                        {/* Visual Marker (Circle) */}
                        <div
                          className={`
                            z-10 w-7 h-7 rounded-full border-2 transition-all duration-100 transform pointer-events-none
                            ${isSelected(stringIndex, fretIndex) 
                              ? 'bg-purple-500 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-110 opacity-100' 
                              // Show semi-transparent ghost circle when hovering the cell (group-hover)
                              : 'bg-gray-200 border-transparent opacity-0 group-hover:opacity-80 scale-100'}
                          `}
                        >
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Fret Markers Overlay (Dots) */}
              <div className="absolute top-0 bottom-0 left-10 right-0 pointer-events-none flex">
                 {frets.map((fret) => (
                   <div key={`marker-${fret}`} className="flex-1 relative">
                      {renderFretMarker(fret)}
                   </div>
                 ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordIdentifier;