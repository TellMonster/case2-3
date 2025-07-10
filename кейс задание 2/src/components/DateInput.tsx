import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DateInputProps {
  onSubmit: (day: number, month: number, year: number) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onSubmit }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateDate = () => {
    const newErrors: { [key: string]: string } = {};
    
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (!day || dayNum < 1 || dayNum > 31) {
      newErrors.day = 'День от 1 до 31';
    }

    if (!month || monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Месяц от 1 до 12';
    }

    if (!year || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      newErrors.year = `Год от 1900 до ${new Date().getFullYear()}`;
    }

    if (dayNum && monthNum && yearNum) {
      const date = new Date(yearNum, monthNum - 1, dayNum);
      if (date.getDate() !== dayNum || date.getMonth() !== monthNum - 1 || date.getFullYear() !== yearNum) {
        newErrors.day = 'Неверная дата';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDate()) {
      onSubmit(parseInt(day), parseInt(month), parseInt(year));
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              День
            </label>
            <input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-center"
              placeholder="ДД"
              min="1"
              max="31"
            />
            {errors.day && (
              <p className="mt-1 text-red-400 text-xs">{errors.day}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Месяц
            </label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-center"
              placeholder="ММ"
              min="1"
              max="12"
            />
            {errors.month && (
              <p className="mt-1 text-red-400 text-xs">{errors.month}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Год
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-center"
              placeholder="ГГГГ"
              min="1900"
              max={new Date().getFullYear()}
            />
            {errors.year && (
              <p className="mt-1 text-red-400 text-xs">{errors.year}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <span>Анализировать</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default DateInput;