import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';

function getLast7Days() {
  const arr = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push({
      key: d.toISOString().split('T')[0],
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      dateNum: d.getDate(),
    });
  }
  return arr;
}

function WeeklyProgress({ habit, logs }) {
  const days = useMemo(() => getLast7Days(), []);

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl border border-slate-100 p-4 sm:p-6 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Weekly Progress</h3>
            <p className="text-sm text-slate-600">Your last 7 days at a glance</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm text-slate-600">{habit ? habit.name : 'No habit selected'}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2 sm:gap-3">
        {days.map((d) => {
          const done = habit && logs && Boolean(logs[d.key]);
          return (
            <div key={d.key} className="flex flex-col items-center">
              <div
                className={`h-12 w-12 rounded-xl border grid place-items-center text-sm font-semibold transition-colors ${done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-slate-700 bg-white'}`}
                title={`${d.key} ${done ? 'completed' : 'not completed'}`}
              >
                {d.dateNum}
              </div>
              <span className="mt-1 text-xs text-slate-500">{d.label}</span>
            </div>
          );
        })}
      </div>

      {!habit && (
        <p className="mt-4 text-sm text-slate-500">Select a habit to view progress.</p>
      )}
    </div>
  );
}

export default WeeklyProgress;
