import './App.css'

import { useState } from 'react';

import RandomFact from '../RandomFact/RandomFact';
import DayFact from '../DayFact/DayFact';
import HistoryFacts from '../HistoryFacts/HistoryFacts';

function App() {

	const [history, setHistory] = useState([]);

	const addToHistory = (fact) => {
		setHistory((prev) => [fact, ...prev]);
	};

	const clearHistory = () => {
		setHistory([]);
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
			<h1 className="text-4xl font-bold text-blue-400 mb-8">FactStorm</h1>
			<div className="relative flex">
				<RandomFact addToHistory={addToHistory}/>
				<DayFact/>
			</div>
			<HistoryFacts history={history} clearHistory={clearHistory}/>
		</main>
	);
}

export default App;