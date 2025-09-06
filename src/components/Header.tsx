import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-blue-100 py-3 px-4 flex items-center">
      <div className="flex items-center gap-2">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="myExpences Logo" className="w-8 h-8 rounded-full" />
        <span className="text-xl font-bold text-[#1e3a8a] tracking-tight">myExpences</span>
      </div>
    </header>
  );
};

export default Header;
