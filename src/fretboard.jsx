import React from 'react';
import { X } from 'lucide-react';

const Fretboard = ({ selectedNotes, onFretClick }) => {
  
  // Standard Tuning: High e (top) to Low E (bottom)
  const strings = ['e', 'B', 'G', 'D', 'A', 'E'];
  const totalFrets = 15;
  
  // Start from 0 to include the Nut
  const frets = Array.from({ length: totalFrets + 1 }, (_, i) => i);

  // Note Calculation Logic
  const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const openStringIndices = [4, 11, 7, 2, 9, 4];

  // Helper to get note name
  const getNoteName = (stringIndex, fretIndex) => {
    // If fret is 0 (Nut), return 'Muted' instead of the open note
    if (fretIndex === 0) return 'Muted';
    
    const startIndex = openStringIndices[stringIndex];
    const noteIndex = (startIndex + fretIndex) % 12;
    return chromaticScale[noteIndex];
  };

  // Helper to check if a specific position is selected
  const isSelected = (stringIndex, fretIndex) => {
    const selection = selectedNotes[stringIndex];
    
    // If it's an object (like { fret: 3, note: 'G' }), check the .fret property
    if (selection && typeof selection === 'object') {
      return selection.fret === fretIndex;
    }
    
    // Otherwise treat it as a simple number (like 3)
    return selection === fretIndex;
  };

  const renderFretMarker = (i) => {
    if (i === 0) return null;
    const singleDots = [3, 5, 7, 9, 15];
    const doubleDots = [12];
    
    if (singleDots.includes(i)) {
      return <div className="absolute w-4 h-4 bg-gray-700/50 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>;
    }
    if (doubleDots.includes(i)) {
      return (
        <>
          <div className="absolute w-4 h-4 bg-gray-700/50 rounded-full top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute w-4 h-4 bg-gray-700/50 rounded-full top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 p-1 rounded-2xl border border-gray-700 shadow-2xl overflow-x-auto">
      <div className="min-w-[900px] relative p-4 select-none"> 
        
        <div className="flex mb-2 pl-10">
          {frets.map((fret) => (
            <div key={fret} className="flex-1 text-center text-gray-100 text-xs font-mono font-bold uppercase tracking-wider">
              {fret === 0 ? 'Nut' : fret}
            </div>
          ))}
        </div>

        <div className="flex flex-col relative bg-[#2a2a2a] rounded-lg border-2 border-gray-700 overflow-hidden">
          
          {strings.map((stringName, stringIndex) => (
            <div key={stringIndex} className="flex items-center h-12 relative border-b border-gray-800 last:border-none">
              
              <div className="w-10 flex-shrink-0 text-center font-bold text-gray-100 text-lg border-r border-gray-700 h-full flex items-center justify-center bg-gray-900">
                {stringName}
              </div>

              <div 
                className="absolute left-10 right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 z-0 pointer-events-none shadow-sm"
                style={{ height: `${stringIndex * 0.5 + 1}px`, opacity: 0.6 }}
              ></div>

              <div className="flex flex-1 relative h-full">
                {frets.map((fretIndex) => {
                  const active = isSelected(stringIndex, fretIndex);
                  const isNut = fretIndex === 0;
                  const noteName = getNoteName(stringIndex, fretIndex);

                  return (
                    <div 
                      key={fretIndex}
                      // Pass noteName so parent components can use it
                      onClick={() => onFretClick(stringIndex, fretIndex, noteName)}
                      className={`
                        flex-1 relative flex items-center justify-center cursor-pointer group
                        ${isNut 
                          ? 'bg-gray-900/50 border-r-4 border-gray-500 hover:bg-red-900/20' 
                          : 'border-r border-gray-600/50 hover:bg-gray-800/30'}
                      `}
                      title={`${noteName} (${stringName} string, fret ${fretIndex})`}
                    >
                      {active ? (
                        isNut ? (
                          <X className="z-10 w-6 h-6 text-red-500 animate-in zoom-in duration-200" />
                        ) : (
                          <div className="z-10 w-7 h-7 rounded-full border-2 bg-purple-500 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-110 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{noteName}</span>
                          </div>
                        )
                      ) : (
                        <div className={`
                          z-10 w-7 h-7 rounded-full border-2 border-transparent opacity-0 group-hover:opacity-40 scale-100 flex items-center justify-center
                          ${isNut ? 'bg-red-400' : 'bg-gray-200'}
                        `}>
                           {!isNut && <span className="text-[10px] font-bold text-black opacity-50">{noteName}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
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
  );
};

export default Fretboard;