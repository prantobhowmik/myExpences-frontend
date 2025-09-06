import React from 'react';


import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-neutral-100 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="myExpences Logo" className="w-8 h-8 rounded-full" />
        <span className="text-xl font-bold text-black tracking-tight">myExpences</span>
      </div>
      <LogoutButton />
    </header>
  );
};

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
    navigate('/login');
  };
  if (!localStorage.getItem('jwt') && !sessionStorage.getItem('jwt')) return null;
  return (
    <button
      onClick={handleLogout}
      className="ml-4 px-4 py-2 rounded bg-black text-white font-semibold hover:bg-neutral-800 transition"
    >
      Logout
    </button>
  );
}

export default Header;
