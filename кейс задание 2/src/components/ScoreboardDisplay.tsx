import React from 'react';

interface ScoreboardDisplayProps {
  day: number;
  month: number;
  year: number;
}

const ScoreboardDisplay: React.FC<ScoreboardDisplayProps> = ({ day, month, year }) => {
  const digitPatterns: { [key: string]: string[] } = {
    '0': [
      ' *** ',
      '*   *',
      '*   *',
      '*   *',
      '*   *',
      '*   *',
      ' *** '
    ],
    '1': [
      '  *  ',
      ' **  ',
      '  *  ',
      '  *  ',
      '  *  ',
      '  *  ',
      '*****'
    ],
    '2': [
      ' *** ',
      '*   *',
      '    *',
      '  ** ',
      ' *   ',
      '*    ',
      '*****'
    ],
    '3': [
      ' *** ',
      '*   *',
      '    *',
      '  ** ',
      '    *',
      '*   *',
      ' *** '
    ],
    '4': [
      '*   *',
      '*   *',
      '*   *',
      '*****',
      '    *',
      '    *',
      '    *'
    ],
    '5': [
      '*****',
      '*    ',
      '*    ',
      '**** ',
      '    *',
      '*   *',
      ' *** '
    ],
    '6': [
      ' *** ',
      '*   *',
      '*    ',
      '**** ',
      '*   *',
      '*   *',
      ' *** '
    ],
    '7': [
      '*****',
      '    *',
      '   * ',
      '  *  ',
      ' *   ',
      '*    ',
      '*    '
    ],
    '8': [
      ' *** ',
      '*   *',
      '*   *',
      ' *** ',
      '*   *',
      '*   *',
      ' *** '
    ],
    '9': [
      ' *** ',
      '*   *',
      '*   *',
      ' ****',
      '    *',
      '*   *',
      ' *** '
    ],
    '.': [
      '     ',
      '     ',
      '     ',
      '     ',
      '     ',
      '     ',
      '  *  '
    ]
  };

  const renderDigit = (digit: string, index: number) => {
    const pattern = digitPatterns[digit];
    if (!pattern) return null;

    return (
      <div key={index} className="inline-block mx-1">
        {pattern.map((line, lineIndex) => (
          <div key={lineIndex} className="font-mono text-lg leading-tight">
            {line.split('').map((char, charIndex) => (
              <span 
                key={charIndex} 
                className={char === '*' ? 'text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.9)] font-bold' : 'text-transparent select-none'}
                style={{ textShadow: char === '*' ? '0 0 8px rgba(34,211,238,0.8)' : 'none' }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const formatDate = () => {
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString();
    return `${dayStr}.${monthStr}.${yearStr}`;
  };

  const dateString = formatDate();

  return (
    <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-700">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white mb-2">Электронное табло</h2>
        <p className="text-slate-300 text-sm">Дата в стилизованном формате</p>
      </div>

      <div className="bg-black rounded-xl p-6 border-2 border-cyan-400/30 relative overflow-hidden">
        {/* Фоновая сетка */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-cyan-400/30"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="text-cyan-400 text-xs font-mono mb-4 opacity-60">
            {dateString}
          </div>
          
          {/* Цифры из звёздочек */}
          <div className="flex justify-center items-center bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <div className="flex items-center space-x-2">
              {dateString.split('').map((char, index) => renderDigit(char, index))}
            </div>
          </div>
          
          <div className="mt-4 flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-mono">ТАБЛО АКТИВНО</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardDisplay;