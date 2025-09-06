import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AddExpenseWidget from './AddExpenseWidget';
import TotalExpensesWidget from './TotalExpensesWidget';
import ExpenseListWidget from './ExpenseListWidget';



const Home: React.FC = () => {
	const [month, setMonth] = React.useState(new Date().getMonth() + 1);
	const [year, setYear] = React.useState(new Date().getFullYear());

	return (
		<div className="min-h-screen flex flex-col bg-white text-neutral-900">
			<Header />
			<main className="flex-1 flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold mb-4 text-neutral-900">Welcome to myExpences!</h1>
				<p className="text-lg mb-6 text-[#355fa1]">You are logged in.</p>
				<div className="flex flex-row gap-8 items-start justify-center w-full max-w-4xl">
					<AddExpenseWidget />
					<TotalExpensesWidget
						defaultMonth={month}
						defaultYear={year}
						onMonthChange={setMonth}
						onYearChange={setYear}
					/>
				</div>
				<ExpenseListWidget month={month} year={year} />
			</main>
			<Footer />
		</div>
	);
};

export default Home;
