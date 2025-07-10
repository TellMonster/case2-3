import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import DateInput from './components/DateInput';
import Results from './components/Results';
import ScoreboardDisplay from './components/ScoreboardDisplay';

function App() {
  const [birthDate, setBirthDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  const handleDateSubmit = (day: number, month: number, year: number) => {
    setBirthDate({ day, month, year });
  };

  const handleReset = () => {
    setBirthDate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <Calendar className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Анализатор даты</h1>
        </div>

        {!birthDate ? (
          <DateInput onSubmit={handleDateSubmit} />
        ) : (
          <div className="space-y-6">
            <ScoreboardDisplay 
              day={birthDate.day}
              month={birthDate.month}
              year={birthDate.year}
            />
            <Results 
              day={birthDate.day}
              month={birthDate.month}
              year={birthDate.year}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;