import React from 'react';
import { Check, Flame, Trash2 } from 'lucide-react';

function HabitList({ habits, logs, onToggleToday, onRemove, getStreak, selectedHabitId, onSelectHabit }) {
  const today = new Date().toISOString().split('T')[0];

  if (!habits.length) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-100 p-6 shadow flex items-center justify-center text-slate-600">
        Start by creating a tiny habit to track.
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-100 p-4 sm:p-5 shadow">
      <h3 className="text-lg font-semibold text-slate-900">Your habits</h3>
      <ul className="mt-3 space-y-3">
        {habits.map((habit) => {
          const completed = Boolean(logs?.[habit.id]?.[today]);
          const streak = getStreak(habit.id);
          const selected = selectedHabitId === habit.id;
          return (
            <li key={habit.id} className={`rounded-lg border ${selected ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200'} p-3 flex items-center gap-3 justify-between`}>
              <button
                onClick={() => onSelectHabit(habit.id)}
                className="text-left flex-1"
                aria-pressed={selected}
                title="Select to view weekly progress"
              >
                <div className="font-medium text-slate-900">{habit.name}</div>
                <div className="text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-amber-600"><Flame size={16} /> {streak} day{streak === 1 ? '' : 's'} 🔥</span>
                  <span className="text-slate-400">•</span>
                  <span>{habit.targetMinutes} min target</span>
                </div>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleToday(habit.id)}
                  className={`inline-flex items-center justify-center h-10 w-10 rounded-lg border transition-colors ${completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-slate-400 text-slate-700'}`}
                  title={completed ? 'Mark uncomplete for today' : 'Mark complete for today'}
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => onRemove(habit.id)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  title="Delete habit"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HabitList;
