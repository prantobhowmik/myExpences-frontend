
import React, { useState } from 'react';
import { BASE_URL } from '../api/base';

interface ExpensePayload {
  amount: number;
  description: string;
  date: string;
  category: string;
}

const AddExpenseWidget: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [form, setForm] = useState<ExpensePayload>({
    amount: 0,
    description: '',
    date: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
      const payload = {
        amount: form.amount,
        description: form.description,
        date: form.date ? new Date(form.date).toISOString() : '',
        category: form.category,
      };
      const res = await fetch(`${BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to add expense');
      }
      setSuccess(true);
      setForm({ amount: 0, description: '', date: '', category: '' });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm border border-neutral-200">
      <h3 className="text-lg font-bold mb-4 text-neutral-900">Add Expense</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          min={0}
          required
          className="px-3 py-2 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900 bg-white"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="px-3 py-2 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900 bg-white"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900 bg-white"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900 bg-white"
        >
          <option value="" disabled>Select category</option>
          <option value="food">Food</option>
          <option value="home">Home</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="shopping">Shopping</option>
          <option value="grocery">Grocery</option>
          <option value="utility">Utility</option>
          <option value="pot">Pot</option>
          <option value="alcohol">Alcohol</option>
          <option value="drugs">Drugs</option>
          <option value="medicine">Medicine</option>
          <option value="dr appointment">Dr Appointment</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="mt-2 py-2 rounded bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
        {error && <div className="text-red-500 text-sm text-center mt-1">{error}</div>}
        {success && <div className="text-green-500 text-sm text-center mt-1">Expense added!</div>}
      </form>
    </div>
  );
};

export default AddExpenseWidget;
