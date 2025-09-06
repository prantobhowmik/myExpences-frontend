import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Home: React.FC = () => {
		const handleLogout = () => {
			sessionStorage.removeItem('jwt');
			window.location.href = '/';
		};

		return (
			<div className="min-h-screen flex flex-col bg-[#f6f8fb] text-[#1e3a8a]">
				<Header />
						<main className="flex-1 flex flex-col items-center justify-center">
							<h1 className="text-3xl font-bold mb-4 text-[#1e3a8a]">Welcome to myExpences!</h1>
							<p className="text-lg mb-6 text-[#355fa1]">You are logged in.</p>
							<button
								onClick={handleLogout}
								className="px-6 py-2 rounded-full bg-white border border-[#2563eb] text-[#2563eb] font-semibold text-base shadow-sm hover:bg-[#f0f6ff] transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
								</svg>
								Logout
							</button>
						</main>
				<Footer />
			</div>
		);
};

export default Home;
