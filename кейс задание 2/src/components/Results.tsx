import React from 'react';
import { Calendar, Star, Clock, RotateCcw } from 'lucide-react';

interface ResultsProps {
  day: number;
  month: number;
  year: number;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ day, month, year, onReset }) => {
  const getDayOfWeek = (day: number, month: number, year: number): string => {
    const date = new Date(year, month - 1, day);
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
  };

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const calculateAge = (day: number, month: number, year: number): number => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const dayOfWeek = getDayOfWeek(day, month, year);
  const leapYear = isLeapYear(year);
  const age = calculateAge(day, month, year);

  const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-700">
          <div className="flex items-center mb-3">
            <Calendar className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className="text-lg font-bold text-white">День недели</h3>
          </div>
          <p className="text-2xl font-bold text-purple-400">{dayOfWeek}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-700">
          <div className="flex items-center mb-3">
            <Star className="w-6 h-6 text-yellow-400 mr-2" />
            <h3 className="text-lg font-bold text-white">Високосный год</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            {leapYear ? 'Да' : 'Нет'}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-700">
          <div className="flex items-center mb-3">
            <Clock className="w-6 h-6 text-green-400 mr-2" />
            <h3 className="text-lg font-bold text-white">Возраст</h3>
          </div>
          <p className="text-2xl font-bold text-green-400">{age} лет</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-3">Сводка</h3>
        <div className="text-slate-300 space-y-1 text-sm">
          <p>{day} {monthNames[month - 1]} {year} года</p>
          <p>{dayOfWeek}</p>
          <p>{leapYear ? 'Високосный год' : 'Обычный год'}</p>
          <p>Возраст: {age} лет</p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Новая дата</span>
      </button>
    </div>
  );
};

export default Results;