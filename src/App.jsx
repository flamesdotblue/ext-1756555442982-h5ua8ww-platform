import React, { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import WeeklyProgress from './components/WeeklyProgress';

const HABITS_KEY = 'mind_habits';
const LOGS_KEY = 'mind_logs'; // structure: { [habitId]: { [yyyy-mm-dd]: true } }

function todayKey() {
  return new Date().toISOString().split('T')[0];
}

function App() {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState({});
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedHabits = JSON.parse(localStorage.getItem(HABITS_KEY) || '[]');
      const storedLogs = JSON.parse(localStorage.getItem(LOGS_KEY) || '{}');
      setHabits(storedHabits);
      setLogs(storedLogs);
      if (storedHabits.length) setSelectedHabitId(storedHabits[0].id);
    } catch (e) {
      console.error('Failed to load saved data', e);
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  }, [habits]);
  useEffect(() => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  const addHabit = (habit) => {
    setHabits((prev) => {
      const next = [...prev, habit];
      if (!selectedHabitId) setSelectedHabitId(habit.id);
      return next;
    });
  };

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setLogs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (selectedHabitId === id) {
      setSelectedHabitId((prev) => {
        const remaining = habits.filter((h) => h.id !== id);
        return remaining[0]?.id || null;
      });
    }
  };

  const toggleToday = (habitId) => {
    const d = todayKey();
    setLogs((prev) => {
      const habitLogs = prev[habitId] || {};
      const nextHabitLogs = { ...habitLogs, [d]: !habitLogs[d] };
      return { ...prev, [habitId]: nextHabitLogs };
    });
  };

  const getStreak = (habitId) => {
    const habitLogs = logs[habitId] || {};
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 3650; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().split('T')[0];
      if (habitLogs[key]) streak += 1; else break;
    }
    return streak;
  };

  const selectedHabit = useMemo(
    () => habits.find((h) => h.id === selectedHabitId) || null,
    [habits, selectedHabitId]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
      <Hero />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 -mt-24 relative z-10">
        <section className="bg-white/90 backdrop-blur shadow-xl rounded-2xl p-4 sm:p-6 border border-slate-100">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">Build a gentle mindfulness habit</h2>
          <p className="mt-1 text-slate-600">Small, consistent check-ins — track 1 minute a day and grow your streak.</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <HabitForm onAdd={addHabit} />
            <HabitList
              habits={habits}
              logs={logs}
              onToggleToday={toggleToday}
              onRemove={removeHabit}
              getStreak={getStreak}
              selectedHabitId={selectedHabitId}
              onSelectHabit={setSelectedHabitId}
            />
          </div>
        </section>

        <section className="mt-6">
          <WeeklyProgress
            habit={selectedHabit}
            logs={selectedHabit ? logs[selectedHabit.id] || {} : {}}
          />
        </section>

        <footer className="py-12 text-center text-slate-500">
          <p>Be kind to yourself. Tiny steps count.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
