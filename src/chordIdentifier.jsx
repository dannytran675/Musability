import React, { useState } from 'react';
import { ArrowLeft, Music, Trash2 } from 'lucide-react';
import Fretboard from './Fretboard';

const ChordIdentifier = ({ goBack }) => {
  const [selectedNotes, setSelectedNotes] = useState({});

  // --- CHORD ALGORITHM ---
  const identifyChord = (notesObj) => {
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const openStringIndices = [4, 11, 7, 2, 9, 4];
    
    let activeNotes = [];

    // 1. ITERATE OVER ALL 6 STRINGS
    for (let i = 5; i >= 0; i--) {
      const selection = notesObj[i];
      if (selection) {
        if (selection.note !== 'Muted') {
          activeNotes.push(selection.note);
        }
      } else {
        const openNote = chromaticScale[openStringIndices[i]];
        activeNotes.push(openNote);
      }
    }

    // 2. Extract unique notes
    const uniqueNotes = [...new Set(activeNotes)];

    // Edge cases
    if (uniqueNotes.length === 0) return ['Muted']; 

    // 3. Helper to calculate intervals relative to a specific root note
    const getIntervals = (root) => {
      const rootIndex = chromaticScale.indexOf(root);
      return uniqueNotes.map(note => {
        const noteIndex = chromaticScale.indexOf(note);
        return (noteIndex - rootIndex + 12) % 12;
      }).sort((a, b) => a - b);
    };

    // 4. Chord Definitions
    const chordDefinitions = [
      { name: 'Major', intervals: [0, 4, 7] },
      { name: 'Minor', intervals: [0, 3, 7] },
      { name: '5 (Power Chord)', intervals: [0, 7] },
      { name: 'Diminished', intervals: [0, 3, 6] },
      { name: 'Augmented', intervals: [0, 4, 8] },
      { name: 'Sus2', intervals: [0, 2, 7] },
      { name: 'Sus4', intervals: [0, 5, 7] },
      { name: 'Maj7', intervals: [0, 4, 7, 11] },
      { name: 'Min7', intervals: [0, 3, 7, 10] },
      { name: 'Dom7', intervals: [0, 4, 7, 10] },
      { name: 'Dim7', intervals: [0, 3, 6, 9] },
      { name: 'm7b5', intervals: [0, 3, 6, 10] },
      { name: 'add9', intervals: [0, 2, 4, 7] },
      { name: 'm(add9)', intervals: [0, 2, 3, 7] },
      { name: '6', intervals: [0, 4, 7, 9] },
      { name: 'm6', intervals: [0, 3, 7, 9] },
      { name: '6/9', intervals: [0, 2, 4, 7, 9] },
      { name: '9', intervals: [0, 2, 4, 7, 10] },
      { name: 'm9', intervals: [0, 2, 3, 7, 10] },
      { name: 'maj9', intervals: [0, 2, 4, 7, 11] },
      { name: '11', intervals: [0, 2, 4, 5, 7, 10] },
      { name: '13', intervals: [0, 2, 4, 5, 7, 9, 10] },
      { name: 'Major (no5)', intervals: [0, 4] },
      { name: 'Minor (no5)', intervals: [0, 3] },
      { name: 'm11', intervals: [0, 3, 5, 7, 10] }, 
    ];

    // 5. FIND ALL MATCHES
    const matches = [];

    for (let root of uniqueNotes) {
      const currentIntervals = getIntervals(root);
      
      const foundChord = chordDefinitions.find(def => 
        JSON.stringify(def.intervals) === JSON.stringify(currentIntervals)
      );

      if (foundChord) {
        matches.push(`${root} ${foundChord.name}`);
      }
    }

    if (matches.length > 0) {
      return matches;
    }

    return [`Unknown Shape (${uniqueNotes.join(', ')})`];
  };

  const chordNames = identifyChord(selectedNotes);

  const handleFretClick = (stringIndex, fretIndex, noteName) => {
    setSelectedNotes((prev) => {
      const newNotes = { ...prev };
      const currentSelection = newNotes[stringIndex];
      
      if (currentSelection && currentSelection.fret === fretIndex) {
        delete newNotes[stringIndex]; 
      } else {
        newNotes[stringIndex] = { fret: fretIndex, note: noteName };
      }
      return newNotes;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
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
            <Music className="w-8 h-8 text-purple-400" />
            Chord Identifier
          </h1>

          {/* MOVED: ACTIVE NOTES SECTION TO TOP */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center mb-8">
            <h2 className="text-sm font-bold mb-4 text-purple-300 uppercase tracking-widest">Active Notes</h2>
            <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((strIdx) => {
                  const selection = selectedNotes[strIdx];
                  const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                  const openStringIndices = [4, 11, 7, 2, 9, 4];
                  
                  let displayNote = '';
                  let statusClass = 'border-gray-600 text-white';

                  if (selection) {
                      if (selection.note === 'Muted') {
                          displayNote = 'X';
                          statusClass = 'border-red-900/50 text-red-500 bg-red-900/10';
                      } else {
                          displayNote = selection.note;
                          statusClass = 'border-purple-500/50 text-white bg-purple-900/20';
                      }
                  } else {
                      displayNote = chromaticScale[openStringIndices[strIdx]];
                      statusClass = 'border-gray-700 text-gray-400 bg-gray-800';
                  }

                  return (
                    <div key={strIdx} className={`px-2 py-2 sm:px-4 sm:py-2 rounded-lg border shadow-sm ${statusClass} min-w-[40px] sm:min-w-[60px] flex flex-col items-center justify-center`}>
                      <span className="text-[8px] sm:text-[10px] uppercase block mb-1 opacity-70">Str {strIdx + 1}</span>
                      <span className="text-lg sm:text-xl font-bold leading-none">{displayNote}</span>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>

        {/* Fretboard Component */}
        <Fretboard 
          selectedNotes={selectedNotes} 
          onFretClick={handleFretClick}
        />

        <div className="mt-8 text-center min-h-[120px] flex flex-col justify-center bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Identified Chord</h2>
          <div className="flex flex-col items-center justify-center">
            {chordNames.map((name, index) => (
              <span 
                key={index}
                className={`text-4xl font-extrabold transition-all duration-300 block 
                  ${name.includes('Unknown') || name.includes('Select') || name.includes('Muted')
                    ? 'text-gray-500 text-2xl' 
                    : 'text-purple-300 scale-110 mb-2'}`}
              >
                {name}
              </span>
            ))}
            {/* Helper text if multiple chords found */}
            {chordNames.length > 1 && (
              <span className="text-xs text-gray-500 mt-4 font-mono uppercase tracking-widest bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                Multiple Names Found
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChordIdentifier;