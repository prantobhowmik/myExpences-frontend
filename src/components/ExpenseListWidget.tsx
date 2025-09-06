import React, { useEffect, useState } from 'react';

interface ExpenseItem {
  amount: number;
  description: string;
  date: string;
  category: string;
  _id: string;
}

interface Props {
  month: number;
  year: number;
}

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ExpenseListWidget: React.FC<Props> = ({ month, year }) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
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
        if (!res.ok) throw new Error('Failed to fetch expenses');
        const data: ExpenseItem[] = await res.json();
        setExpenses(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [month, year]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl border border-neutral-200 mt-6">
      <h3 className="text-lg font-bold mb-4 text-neutral-900">Expense Details</h3>
      {loading ? (
        <div className="text-neutral-500 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : expenses.length === 0 ? (
        <div className="text-neutral-500 text-sm">No expenses found for this month.</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-2 pr-2 whitespace-nowrap">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="py-2 pr-2">{exp.description}</td>
                <td className="py-2 pr-2">{exp.category}</td>
                <td className="py-2 text-right font-semibold text-black">₹ {exp.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseListWidget;
