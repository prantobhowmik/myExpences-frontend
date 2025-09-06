import React, { useEffect, useState } from 'react';


interface ExpenseItem {
  amount: number;
  description: string;
  date: string;
  category: string;
  _id: string;
}

interface Props {
  defaultMonth?: number;
  defaultYear?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
}

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const now = new Date();

const TotalExpensesWidget: React.FC<Props> = ({ defaultMonth = now.getMonth() + 1, defaultYear = now.getFullYear(), onMonthChange, onYearChange }) => {
  const [month, setMonth] = useState<number>(defaultMonth);
  const [year, setYear] = useState<number>(defaultYear);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
        const res = await fetch(`${BASE_URL}/expenses?month=${month}&year=${year}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch total expenses');
  const data: ExpenseItem[] = await res.json();
  const sum = Array.isArray(data) ? data.reduce((acc, item) => acc + (typeof item.amount === 'number' ? item.amount : 0), 0) : 0;
  setTotal(sum);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
        setTotal(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTotal();
  }, [month, year]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm border border-neutral-200 mt-6">
      <h3 className="text-lg font-bold mb-4 text-neutral-900">Total Expenses (Month)</h3>
      <form className="flex gap-2 mb-4 items-end">
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Month</label>
          <input
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={e => {
              setMonth(Number(e.target.value));
              if (typeof onMonthChange === 'function') onMonthChange(Number(e.target.value));
            }}
            className="w-20 px-2 py-1 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1">Year</label>
          <input
            type="number"
            min={2000}
            max={2100}
            value={year}
            onChange={e => {
              setYear(Number(e.target.value));
              if (typeof onYearChange === 'function') onYearChange(Number(e.target.value));
            }}
            className="w-24 px-2 py-1 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900 bg-white"
          />
        </div>
      </form>
      {loading ? (
        <div className="text-neutral-500 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="text-2xl font-bold text-black">₹ {typeof total === 'number' && !isNaN(total) ? total.toLocaleString() : '--'}</div>
      )}
    </div>
  );
};

export default TotalExpensesWidget;
