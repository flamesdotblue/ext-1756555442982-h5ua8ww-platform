import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function HabitForm({ onAdd }) {
  const [name, setName] = useState('1-minute breathing');
  const [minutes, setMinutes] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const habit = {
      id: crypto.randomUUID(),
      name: trimmed,
      targetMinutes: Math.max(1, Number(minutes) || 1),
      createdAt: Date.now(),
    };
    onAdd(habit);
    setName('');
    setMinutes(1);
  };

  return (
    <form onSubmit={submit} className="bg-white/80 backdrop-blur rounded-xl border border-slate-100 p-4 sm:p-5 shadow">
      <h3 className="text-lg font-semibold text-slate-900">Create a micro habit</h3>
      <p className="text-sm text-slate-600 mt-1">Keep it tiny. One minute is a win.</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Box breathing"
            className="mt-1 w-full rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-400/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Target (min)</label>
          <input
            type="number"
            min={1}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="mt-1 w-full rounded-lg border-slate-200 focus:border-sky-400 focus:ring-sky-400/30"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 transition-colors"
      >
        <Plus size={18} /> Add habit
      </button>
    </form>
  );
}

export default HabitForm;
