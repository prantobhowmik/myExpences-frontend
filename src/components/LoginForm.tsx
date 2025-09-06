import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import Toast, { ToastType } from './Toast';
// Removed Button and Toast UI imports

interface LoginFormData {
  identifier: string; // username, phone, or email
  password: string;
}

const initialForm: LoginFormData = {
  identifier: '',
  password: '',
};


const LoginForm: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logoRef.current && formRef.current) {
      gsap.set([logoRef.current, formRef.current], { autoAlpha: 0, scale: 0.92 });
      gsap.timeline()
        .to(logoRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(formRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.2');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const res = await login(form);
      if (res && res.access_token) {
        sessionStorage.setItem('jwt', res.access_token);
        setToast({ message: 'Login successful!', type: 'success' });
        setForm(initialForm);
        setTimeout(() => navigate('/home'), 800);
      } else {
        setToast({ message: 'No token received', type: 'error' });
      }
    } catch (err: any) {
      setToast({ message: err.message || 'Login failed', type: 'error' });
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1e3a8a] to-[#60a5fa] text-[#1e3a8a] px-2">
        <div className="w-full max-w-xs bg-white rounded-xl shadow-xl p-6 flex flex-col items-center gap-6 border border-[#3b82f6]">
          <img
            ref={logoRef}
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="myExpences Logo"
            className="w-14 h-14 rounded-full shadow bg-white object-cover border border-[#3b82f6] mb-1"
            loading="lazy"
          />
          <h2 className="text-lg font-extrabold tracking-tight text-center mb-1">Sign in to <span className="text-[#2563eb]">myExpences</span></h2>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <div className="relative">
              <input
                id="identifier"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                required
                className="peer w-full px-3 pt-6 pb-2 rounded-lg bg-[#eff6ff] text-[#1e3a8a] border border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] placeholder-transparent transition"
                placeholder="Username, Email or Phone"
              />
              <label htmlFor="identifier" className="absolute left-3 top-2 text-xs text-[#2563eb] font-semibold pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Username, Email or Phone</label>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#2563eb] hover:text-[#1e40af] focus:outline-none"
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
              {loading ? 'Logging In...' : 'Login'}
            </button>
            <div className="text-center text-xs mt-2">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[#2563eb] font-semibold hover:underline">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
