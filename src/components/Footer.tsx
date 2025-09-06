import React from 'react';

const Footer: React.FC = () => {
  return (
  <footer className="w-full bg-white border-t border-neutral-100 py-3 px-4 flex items-center justify-center mt-auto">
  <span className="text-xs text-black">&copy; {new Date().getFullYear()} myExpences. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
