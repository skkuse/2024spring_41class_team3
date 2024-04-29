import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';
import DetailPages from './pages/DetailPages';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/list" element={<ListPage />} />
				<Route path="/detail/:id" element={<DetailPages />} />
			</Routes>
		</Router>
	);
}
