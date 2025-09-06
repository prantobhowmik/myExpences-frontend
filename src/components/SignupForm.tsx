import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../api/auth';
import Toast, { ToastType } from './Toast';

interface SignupFormData {
  full_name: string;
  username: string;
  email: string;
  mobile: string;
  date_of_birth: string;
  password: string;
}

const initialForm: SignupFormData = {
  full_name: '',
  username: '',
  email: '',
  mobile: '',
  date_of_birth: '',
  password: '',
};

const SignupForm: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      await signup(form);
      setToast({ message: 'Signup successful!', type: 'success' });
      setForm(initialForm);
    } catch (err: any) {
      setToast({ message: err.message || 'Signup failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
  <div className="min-h-screen flex flex-col items-center justify-center bg-white text-neutral-900 px-2">
        <div className="w-full max-w-xs bg-white rounded-xl shadow-xl p-4 flex flex-col items-center gap-4 border border-[#3b82f6]">
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="myExpences Logo"
            className="w-14 h-14 rounded-full shadow bg-white object-cover border border-[#3b82f6] mb-1"
            loading="lazy"
          />
          <h2 className="text-lg font-extrabold tracking-tight text-center mb-1">Create your <span className="text-black">myExpences</span> account</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="relative">
            <input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} required className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-white text-black border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-black placeholder-transparent transition" placeholder="Full Name" />
            <label htmlFor="full_name" className="absolute left-3 top-2 text-xs text-black font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Full Name</label>
          </div>
          <div className="relative">
            <input id="username" name="username" value={form.username} onChange={handleChange} required className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-white text-black border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-black placeholder-transparent transition" placeholder="Username" />
            <label htmlFor="username" className="absolute left-3 top-2 text-xs text-black font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Username</label>
          </div>
          <div className="relative">
            <input id="email" name="email" value={form.email} onChange={handleChange} required type="email" className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-white text-black border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-black placeholder-transparent transition" placeholder="Email" />
            <label htmlFor="email" className="absolute left-3 top-2 text-xs text-black font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Email</label>
          </div>
          <div className="relative">
            <input id="mobile" name="mobile" value={form.mobile} onChange={handleChange} required className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-white text-black border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-black placeholder-transparent transition" placeholder="Mobile" />
            <label htmlFor="mobile" className="absolute left-3 top-2 text-xs text-black font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Mobile</label>
          </div>
          <div className="relative">
            <input id="date_of_birth" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required type="date" className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-white text-black border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-black placeholder-transparent transition" placeholder="Date of Birth" />
            <label htmlFor="date_of_birth" className="absolute left-3 top-2 text-xs text-black font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Date of Birth</label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type={showPassword ? 'text' : 'password'}
              className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-[#eff6ff] text-[#1e3a8a] border border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] placeholder-transparent transition pr-10"
              placeholder="Password"
            />
            <label htmlFor="password" className="absolute left-3 top-2 text-xs text-[#2563eb] font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Password</label>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black hover:text-neutral-400 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4.03-9-7s4-7 9-7c1.13 0 2.21.19 3.22.54M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.06 2.06A9.97 9.97 0 0021 12c0-1.07-.19-2.09-.54-3.03M9.88 9.88l4.24 4.24" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9 0c0 2.97-4 7-9 7s-9-4.03-9-7 4-7 9-7 9 4.03 9 7z" />
                </svg>
              )}
            </button>
          </div>
          <button type="submit" className="w-full py-2 rounded-lg bg-[#2563eb] hover:bg-[#1e40af] text-white font-bold text-base tracking-wide shadow transition disabled:opacity-60" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="text-center text-sm mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2563eb] font-semibold hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignupForm;
